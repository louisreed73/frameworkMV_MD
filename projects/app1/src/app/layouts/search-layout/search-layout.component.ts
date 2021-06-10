import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
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
export class SearchLayoutComponent implements OnInit, OnDestroy {
  /*=============================================
  =            Subscriptions            =
  =============================================*/

  paginaSub: Subscription;
  stopScrollSub: Subscription;
  stopScrollSubResoluciones: Subscription;
  stopScrollSubEscritos: Subscription;

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

  container = "mat-sidenav-content";

  constructor(
    private documentos: DocumentosService,
    private resoluciones: ResolucionesService,
    private escritos: EscritosService,
    private spinner: SpinnerService,
    private searchTrigger: SearchTriggerService,
    private _appService: AppService,
    private location: Location
  ) {}

  ngOnInit() {
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

  onScroll() {
    // On scroll we stopped the handler to prevent continously sending request to API
    // We increment pagination for the next request

    // console.log("Scrolling!!!");
    let routePath = this.location.path().replace(/\//, "");
    console.log("Scrolling!!!!", routePath);
    if (!this.stopScroll) {
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
    }
    // this.documentos.pagina$.next(this.searchTrigger.updatedPaginaDocumentos + 1);
  }

  ngOnDestroy(): void {
    // We unsubscribe from actual page
    // this.paginaSub.unsubscribe();
    this.stopScrollSub.unsubscribe();
    this.stopScrollSubResoluciones.unsubscribe();
    this.stopScrollSubEscritos.unsubscribe();
  }
}
