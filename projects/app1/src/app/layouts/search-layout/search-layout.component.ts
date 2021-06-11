import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { fromEvent, Subject, Subscription } from "rxjs";
import { debounceTime, delay, skip, skipUntil, tap, throttleTime } from "rxjs/operators";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { SpinnerService } from "projects/app1/src/app/services/spinner.service";
import { MatDrawerContent } from "@angular/material";
import { AppService } from "@mova/components/core";
import { Location } from "@angular/common";
import { ResolucionesService } from "../../services/resoluciones.service";
import { EscritosService } from "../../services/escritos.service";

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

  paginaSub: Subscription;
  stopScrollSub: Subscription;
  stopScrollSubResoluciones: Subscription;
  stopScrollSubEscritos: Subscription;
  scrollInfiniteSub: Subscription;

  /*=====  End of Subscriptions  ======*/

  /*=============================================
=            Observables            =
=============================================*/
  spinner$: Subject<boolean> = this.spinner.requestSpinner$;
  pagina$: Subject<number>;

  /*=====  End of Observables  ======*/

  /*=============================================
=            class members            =
=============================================*/
  //Saving actual num Page
  pagina: number;
  // Saving stop Scroll to properly stop scroll
  stopScroll: boolean;

  /*=====  End of Pagination memeber  ======*/

  // container = "mat-sidenav-content";
  element = this.window.document.querySelector("mat-sidenav-content");

  constructor(
    private documentos: DocumentosService,
    private resoluciones: ResolucionesService,
    private escritos: EscritosService,
    private spinner: SpinnerService,
    private searchTrigger: SearchTriggerService,
    private _appService: AppService,
    private location: Location,
    @Inject(Window) private window: Window
  ) {}

  ngOnInit() {
    // console.log(this.element);
    // let element = this.window.document.querySelector("mat-sidenav-content");
    // element.addEventListener("scroll",(e) => {
    //   console.log(
    //     `%cScrolling en el documento: ${element.scrollTop}`,
    //     "color:gold"
    //   );
    //   console.log(
    //     `%cScrolling en el documento: ${element.scrollHeight}`,
    //     "color:gold"
    //   );

    // })

    // on Init we subscribe to initial page - ie page 1;

    // this._appService.closeLateralMenu();

    // this.paginaSub = this.documentos.pagina$
    //   .pipe(
    //     tap((numPag) => {
    //       this.pagina = numPag;
    //       console.log(numPag, "Este es el número de página", "pink");
    //     })
    //   )
    //   .subscribe();
    // We subscribe to stop Scroll Observable and save it into variable
    this.stopScrollSub = this.documentos.stopScroll$
      .pipe(
        tap((data) => {
          console.log(
            `%cRecibiendo la subscripcion de si debo detener el ScrollInfinite: ${data}`,
            "color:lime"
          );
        })
      )
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
        console.log(this.stopScroll);
      });
    this.stopScrollSubResoluciones = this.resoluciones.stopScroll$
      .pipe(
        tap((data) => {
          console.log(
            `%cRecibiendo la subscripcion de si debo detener el ScrollInfinite: ${data}`,
            "color:lime"
          );
        })
      )
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
        console.log(this.stopScroll);
      });
    this.stopScrollSubEscritos = this.escritos.stopScroll$
      .pipe(
        tap((data) => {
          console.log(
            `%cRecibiendo la subscripcion de si debo detener el ScrollInfinite: ${data}`,
            "color:lime"
          );
        })
      )
      .subscribe((mustStop) => {
        this.stopScroll = mustStop;
        console.log(this.stopScroll);
      });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.scrollInfiniteSub=fromEvent(this.element, "scroll")
      .pipe(
        // skip(20),
        debounceTime(100),
        tap(d=>{
                console.log(
          `%cScrolling en el elemento, scrollTop: ${d}`,
          "color:lime"
        );
        }),
        tap(this.calculateScrollBottomPosition.call(this))
      )
      .subscribe((e: Event) => {
        // console.log(
        //   `%cScrolling en el elemento, scrollTop: ${element.scrollTop}`,
        //   "color:lime"
        // );
        // console.log(
        //   `%cGetting Height en el elemento, scrollHeight: ${element.scrollHeight}`,
        //   "color:lime"
        // );
        // console.log(
        //   `%cGetting Height en el elemento, scrollTop + clientHeight: ${element.scrollTop + element.clientHeight}`,
        //   "color:cyan"
        // );
        // console.log(
        //   `%cScrolling en el elemento, clientTop: ${element.clientTop}`,
        //   "color:gold"
        // );
        // console.log(
        //   `%cGetting Height en el elemento, clientHeight: ${element.clientHeight}`,
        //   "color:gold"
        // );
        // this.calculateScrollBottomPosition();
        // console.log(
        //   `%cScrolling en el documento: ${JSON.stringify(
        //     this.window.document.querySelector(".search-results"),
        //     null,
        //     2
        //   )}`,
        //   "color:lime"
        // );
      });
  }

  onScroll() {
    // On scroll we stopped the handler to prevent continously sending request to API
    // We increment pagination for the next request

    // console.log("Scrolling!!!");
    let routePath = this.location.path().replace(/\//, "");
    console.log("Scrolling!!!!", routePath);
    // if (!this.stopScroll) {
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
      // this.documentos.stopScroll$.next(true);
    // }
    // this.documentos.pagina$.next(this.searchTrigger.updatedPaginaDocumentos + 1);
  }

  ngOnDestroy(): void {
    // We unsubscribe from actual page
    // this.paginaSub.unsubscribe();
    this.stopScrollSub.unsubscribe();
    this.stopScrollSubResoluciones.unsubscribe();
    this.stopScrollSubEscritos.unsubscribe();
    this.scrollInfiniteSub.unsubscribe();
  }

  calculateScrollBottomPosition() {
    let temp = 0;

    return () => {
      let scrollDown = false;

      // console.log(this.element.scrollTop);
      console.log(`%cLa variable temporal: ${temp}`, "color:yellow");
      console.log(
        `%cLa variable temporal a insertar: ${this.element.scrollTop}`,
        "color:yellow"
      );
      if (this.element.scrollTop > temp) {
        scrollDown = true;
      }
      console.log(`%cScrollDown!!!!: ${scrollDown}`, "color:yellow");
      temp = this.element.scrollTop;
      console.log(this.element.clientHeight);
      console.log(this.element.clientHeight);
      // console.log(element.);
      // console.log(this);
      let scrollTop = this.element.scrollTop,
        clientHeight = this.element.clientHeight,
        scrollHeight = this.element.scrollHeight;
      let marginToBottom = scrollHeight - (scrollTop + clientHeight);
      if (marginToBottom < 140 && scrollDown && !this.stopScroll) {
        console.log(`%cMargin to Bottom: ${marginToBottom}`, "color:yellow");


          this.onScroll();
        
      } else {
        console.log(`%cNo has llegado!!!: ${marginToBottom}`, "color:red");
      }
    };
  }
}
