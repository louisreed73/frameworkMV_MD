import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { fromEvent, merge } from "rxjs";
import { tap } from "rxjs/operators";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { environment } from "@environments/environment";

/**
 *
 * ButtonTriggerComponent
 * Responsible for
 * search trigger in API
 * Buscador
 */
@Component({
  selector: "app-button-trigger",
  templateUrl: "./button-trigger.component.html",
  styleUrls: ["./button-trigger.component.scss"],
})
export class ButtonTriggerComponent implements OnInit, AfterViewInit {
  /**
   *
   * ElementRef button
   * used for trigger
   * Observable of click event
   * in order to scroll to Top
   * in new search and
   * trigger new Search in API
   * Buscador and page 1 in this search
   *
   */
  @ViewChild("searchTrigger", { static: true }) button: ElementRef;

  /**
   *
   * HTML Element
   * it's used to scroll to Top
   * Position in new Search
   *
   */
  elementScrollTrigger: HTMLElement = this.window.document.querySelector(
    "mat-sidenav-content"
  );

  /**
   *
   * Constructor, initializes Component
   * @param window {Global Window object}
   * @param searchTrigger {SearchTriggerService} trigger new Search through Subject
   * @param location {Angular utility} for route Path information
   *
   */
  constructor(
    @Inject(Window) private window: Window,
    private searchTrigger: SearchTriggerService,
    private location: Location
  ) {}

  /**
   *
   * Angular Hook
   * Logic needed for On Init
   * @returns {void}
   */
  ngOnInit() {}

  /**
   *
   * Angular Hook
   * Logic needed for After View Init
   * @returns {void}
   */
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    merge(
      fromEvent(window.document, "keyup"),
      fromEvent(this.button.nativeElement, "click")
    )
      .pipe()
      .subscribe((event: Event) => {
        let routePath = this.location.path().replace(/\//, "");
        if (event instanceof KeyboardEvent && event.key === "Enter") {
          this.searchAndScroll(routePath);
        }

        if (event instanceof MouseEvent) {
          this.searchAndScroll(routePath);
        }
      });
  }

  /**
   *
   * Method
   * Function to Scroll to top and
   * Trigger new Search
   *
   */
  searchAndScroll(routePath) {
    this.elementScrollTrigger.scrollTo({
      top: 0,
      left: 0,
      behavior: environment.app.scrollBehavior,
    });

    this.searchTrigger.updatedSearch.tipo = routePath;
    if (routePath === "documentos") {
      this.searchTrigger.updatedPaginaDocumentos = 1;
      this.searchTrigger.newTriggerSearchDocumentos.next("busca");
    }
    if (routePath === "resoluciones") {
      this.searchTrigger.updatedPaginaResoluciones = 1;
      this.searchTrigger.newTriggerSearchResoluciones.next("busca");
    }
    if (routePath === "escritos") {
      this.searchTrigger.updatedPaginaEscritos = 1;
      this.searchTrigger.newTriggerSearchEscritos.next("busca");
    }
  }
}
