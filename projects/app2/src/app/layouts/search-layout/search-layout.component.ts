import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { DocumentosService } from "projects/app2/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app2/src/app/services/search-trigger.service";
import { SpinnerService } from "projects/app2/src/app/services/spinner.service";
import { MatDrawerContent } from "@angular/material";
import { AppService } from "@mova/components/core";

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
    private spinner: SpinnerService,
    private searchTrigger: SearchTriggerService,
    private _appService: AppService,

  ) {}

  ngOnInit() {
    // on Init we subscribe to initial page - ie page 1;

    this._appService.closeLateralMenu();


    this.paginaSub = this.documentos.pagina$
      .pipe(
        tap((numPag) => {
          this.pagina = numPag;
          console.log(numPag, "Este es el número de página", "pink");
        })
      )
      .subscribe();
    // We subscribe to stop Scroll Observable and save it into variable
    this.stopScrollSub = this.documentos.stopScroll$.subscribe((mustStop) => {
      this.stopScroll = mustStop;
    });
  }

  onScroll() {
    // On scroll we stopped the handler to prevent continously sending request to API
    // We increment pagination for the next request

    console.log("Scrolling!!!");
    this.documentos.stopScroll$.next(true);
    this.searchTrigger.updatedPagina += 1;
    this.searchTrigger.newTriggerSearch.next();
    // this.documentos.pagina$.next(this.searchTrigger.updatedPagina + 1);
  }

  ngOnDestroy(): void {
    // We unsubscribe from actual page
    this.paginaSub.unsubscribe();
  }
}
