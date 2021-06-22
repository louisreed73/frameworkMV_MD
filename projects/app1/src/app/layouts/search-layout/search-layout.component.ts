import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { fromEvent, Subject, Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { SpinnerService } from "projects/app1/src/app/services/spinner.service";
import { Location } from "@angular/common";
import { ResolucionesService } from "../../services/resoluciones.service";
import { EscritosService } from "../../services/escritos.service";

/**
 *
 * SearchLayoutComponent
 * Responsible for rendering input of user
 * trigger new Search
 * and stop Scroll after navigation
 * for documentos / resoluciones
 * escritos
 */
@Component({
  selector: "app-search-layout",
  templateUrl: "./search-layout.component.html",
  styleUrls: ["./search-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  /*=============================================
  =            Subscriptions            =
  =============================================*/

  
  /**
   *
   * Subscription for sending
   * stop scroll command
   * in documentos on Init Hook
   *
   */  
  stopScrollSub: Subscription;

  /**
   *
   * Subscription for sending
   * stop scroll command
   * in resoluciones on Init Hook
   *
   */  
  stopScrollSubResoluciones: Subscription;

  /**
   *
   * Subscription for sending
   * stop scroll command
   * in escritos on Init Hook
   *
   */  
  stopScrollSubEscritos: Subscription;

  /**
   *
   * Subscription for listen
   * scroll event observable
   * in order to call method
   * calculateScrollBottomPosition
   * to trigger another search
   * infinite scroll funcionality
   */  
  scrollInfiniteSub: Subscription;

  /*=====  End of Subscriptions  ======*/

  /*=============================================
=            Observables            =
=============================================*/


/**
 *
 * Observable receiving if spinner
 * div must be reavealed, if making
 * an http call api - 
 * disabled when http response received
 *
 */
  spinner$: Subject<boolean> = this.spinner.requestSpinner$;


  /*=====  End of Observables  ======*/

  /*=============================================
=            class members            =
=============================================*/

  
  /**
   *
   * Saving stop Scroll to properly
   * stop scroll - conditional to
   * make or not api call
   *
   */  
  stopScroll: boolean;



  
  /**
   * element cache
   * to calculate scroll to bottom scroll
   * Top Position
   * container = "mat-sidenav-content";
   *
   */  
  element = this.window.document.querySelector("mat-sidenav-content");

  
  /**
   * constructor
   * @param documentos {Service} Documentos Service get Documentos
   * @param resoluciones {Service} Resoluciones Service get Resoluciones
   * @param escritos {Service} Escritos Service get Escritos
   * @param spinner {Service} Spinner Service to render Spinner when http call.
   * @param searchTrigger {Service} Search Service to trigger new Search
   * @param location {Service} Location Utility to get actual page path
   * @param window {Service} Window Global Object
   * 
   */  
  constructor(
    private documentos: DocumentosService,
    private resoluciones: ResolucionesService,
    private escritos: EscritosService,
    private spinner: SpinnerService,
    private searchTrigger: SearchTriggerService,
    private location: Location,
    @Inject(Window) private window: Window,
  ) {}

  /**
 *
 * Angular Hook
 * Logic needed for On Init
 * @returns {void}
 */
  ngOnInit() {
    
    /**
     *
     * We subscribe to stop Scroll 
     * Observable and save it into variable
     * when changing between tabs
     * (documentos-resoluciones-escritos)
     * we receive if we must stop scroll
     */    
    this.stopScrollSub = this.documentos.stopScroll$
      .pipe()
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
      });
    this.stopScrollSubResoluciones = this.resoluciones.stopScroll$
      .pipe()
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
      });
    this.stopScrollSubEscritos = this.escritos.stopScroll$
      .pipe()
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
      });
  }

    /**
 *
 * Angular Hook
 * Logic needed for On After View Init
 * @returns {void}
 */
  ngAfterViewInit(): void {

    
    /**
     *
     * Called after ngAfterContentInit
     * when the component's view has been
     * initialized. Applies to components only.
     * 
     * Add 'implements AfterViewInit' to the class.
     * on scroll in mat-sidenav-content component we
     * calculate distance from bottom,
     * calculateScrollBottomPosition method
     * when is < 140px from bottom  we call
     * onScroll method to trigger new http
     * call in each tab (documentos-resoluciones-escritos)
     * At the same time we increment page number
     * 
     */
    this.scrollInfiniteSub = fromEvent(this.element, "scroll")
      .pipe(
        // skip(20),
        debounceTime(100),
        tap(this.calculateScrollBottomPosition.call(this))
      )
      .subscribe((e: Event) => {});
  }

  
  /**
   *
   * On scroll we stopped the handler
   * to prevent continously sending request to API
   * 
   * We increment pagination for the next request 
   * and trigger new Search
   * 
   *
   */  
  onScroll() {


    
    /**
     *
     * routePath variable
     * We cached actual page path
     *
     */    
    let routePath = this.location.path().replace(/\//, "");

    if (routePath === "documentos") {
      this.searchTrigger.updatedPaginaDocumentos += 1;
      this.searchTrigger.newTriggerSearchDocumentos.next();
    }
    if (routePath === "resoluciones") {
      this.searchTrigger.updatedPaginaResoluciones += 1;
      this.searchTrigger.newTriggerSearchResoluciones.next();
    }
    if (routePath === "escritos") {
      this.searchTrigger.updatedPaginaEscritos += 1;
      this.searchTrigger.newTriggerSearchEscritos.next();
    }
  }

    /**
   *
   * Angular Hook
   * Logic needed for On Destroy
   * We unsubscribe from observables
   * needed in this component
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.stopScrollSub.unsubscribe();
    this.stopScrollSubResoluciones.unsubscribe();
    this.stopScrollSubEscritos.unsubscribe();
    this.scrollInfiniteSub.unsubscribe();
  }

  
  /**
   *
   * Method
   * We calculate if top position in this element
   * is less than 140px
   * if so we increment pagination and
   * trigger new Search.
   *
   */  
  calculateScrollBottomPosition() {
    let temp = 0;

    return () => {
      let scrollDown = false;

      if (this.element.scrollTop > temp) {
        scrollDown = true;
      }
      temp = this.element.scrollTop;

      let scrollTop = this.element.scrollTop,
        clientHeight = this.element.clientHeight,
        scrollHeight = this.element.scrollHeight;
      let marginToBottom = scrollHeight - (scrollTop + clientHeight);
      if (marginToBottom < 140 && scrollDown && !this.stopScroll) {
        this.onScroll();
      }
    };
  }
}
