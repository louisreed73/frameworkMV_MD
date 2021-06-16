import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { combineLatest, of, Subject, Subscription } from "rxjs";
import { catchError, delay, map, tap } from "rxjs/operators";
import { FiltrosService } from "projects/app1/src/app/services/filtros.service";
import { InfoService } from "projects/app1/src/app/services/info.service";
import { FiltroComponent } from "projects/app1/src/app/sharedComponents/filtro/filtro.component";
import { ResolucionesService } from "../../../services/resoluciones.service";

@Component({
  selector: "app-search-resoluciones",
  templateUrl: "./search-resoluciones.component.html",
  styleUrls: ["./search-resoluciones.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResolucionesComponent implements OnDestroy, AfterViewInit {
  /*=============================================
    =            Observables            =
    =============================================*/

  // Recibimos el Observable con los datos del número total de documentos / Resoluciones / por término de búsqueda acumulado en pagination.
  docsResoluciones$ = this.resoluciones.resoluciones$.pipe(
    catchError((e: any) => {
      // Saving error message from http Request Error
      // this.errorObj = e.name;
      // this.infoServ.httpErrorInfo$.next(e.name);

      //TODO to comment and uncomment if necessary for checking response and reload page
      //TODO stopping spinner on http request error
      // this.spinner.requestSpinner$.next(false);
      //TODO to remove only for checking response and reload page
      // setTimeout(() => {
      //   this.window.document.defaultView.location.reload();
      // }, 4000);
      return of([]);
    })
  );

  // Observable con el nº total de documentos / Resoluciones / del término de búsqueda
  // docsResolucionesLength$ = this.docsResoluciones.documentosResolucionesLength$;

  /*=====  End of Observables  ======*/


  /*=============================================
=            Error Obj member            =
=============================================*/

  // To Save error message in case Http Request Error
  //Todo remove this
  // errorObj;

  /*=====  End of Error Obj member  ======*/

  /*=============================================
     =    Incorporacion Integracion nuevo Filtro 20-04-2021 =
     =============================================*/


  @ViewChildren(FiltroComponent)
  filtrosComp: QueryList<FiltroComponent>;
  // Subject for broadcast if some filter is collapsed or not
  someCollap$: Subject<boolean> = new Subject();
  toggleCollapseSub: Subscription;
  // Subscription for combineLatest observables receiving acumulated escritos / total escritos in order to stop scroll or not;
  infoServSubs: Subscription;
  elementScrollTrigger = this.window.document.querySelector("mat-sidenav-content");


  // Storing actual filters of resoluciones from filtros service an his method getFiltrosDocumentos
  filtrosResoluciones;

  filtroResolucionesSub: Subscription = this.filtroS
    .getFiltrosResoluciones()
    .pipe()
    .subscribe((data) => {
      this.filtrosResoluciones = {
        data,
        clase: "resoluciones",
      };
    });

  /*=====  End of Incorporacion Integracion nuevo Filtro  ======*/

  constructor(
    private resoluciones: ResolucionesService,
    @Inject(Window) private window: Window,
    public filtroS: FiltrosService,
    private infoServ: InfoService
  ) {}

  // Método para comprobar que los datos del OBservable son efectivamente un array
  isArray(obj) {
    return Array.isArray(obj);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // sending subject with actual tab open
    this.infoServ.infoPath$.next("resoluciones");

    // checking if all resoluciones are received --> stopScroll / if not not stopping Scroll
    this.infoServSubs = combineLatest([
      this.infoServ.resolucionesInfoAcumLength$,
      this.infoServ.resolucionesInfoTotalLength$,
    ])
      .pipe(
        tap((data) => {
          let result = data[0] / data[1];
          if (result === 1) {
            this.resoluciones.stopScroll$.next(true);
          } else {
            this.resoluciones.stopScroll$.next(false);
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    //Subscription for observable checking if some filter is open, if so sending subject true (someCollap$)
    this.toggleCollapseSub = this.filtrosComp.first.triggerCollapse
      .pipe(
        delay(0),
        map((d) => {
          let allToggles = this.filtrosComp.first.toggles.toArray();
          let someCollap = allToggles.some((tog) => {
            return tog.nativeElement.previousElementSibling.checked;
          });
          this.someCollap$.next(someCollap);
          //Todo remove this
          // return of(someCollap);
        })
      )
      .subscribe((d) => {
      });
  }

  ngOnDestroy(): void {
    this.filtroResolucionesSub.unsubscribe();
    this.toggleCollapseSub.unsubscribe();
    this.infoServSubs.unsubscribe();
  }

  // actual method for toggle collapse/uncollapse filters
  collapsing() {
    let allToggles = this.filtrosComp.first.toggles.toArray();
    let someCollap = allToggles.some((tog) => {
      return tog.nativeElement.previousElementSibling.checked;
    });

    allToggles.forEach((tog) => {
      tog.nativeElement.previousElementSibling.checked;
    });

    if (!someCollap) {
      allToggles.forEach((tog) => {
        this.someCollap$.next(true);

        return (tog.nativeElement.previousElementSibling.checked = true);
      });
    } else {
      allToggles.forEach((tog) => {
        this.someCollap$.next(false);

        return (tog.nativeElement.previousElementSibling.checked = false);
      });
    }
  }

  // actual method for reset all filters values
  cleanFilters() {
    let props = Object.keys(this.filtrosComp.first.filtroFormGroup.controls);
    this.filtrosComp.first.filtroFormGroup.reset();

    props.forEach((property, ind) => {
      if (property.match("array")) {
        let AbstractContolLen =
          this.filtrosComp.first.filtroFormGroup.get(property).value.length;
        if (AbstractContolLen) {
          this.filtrosComp.first.eliminaTodo(property);
        }
      }
    });
  }
}
