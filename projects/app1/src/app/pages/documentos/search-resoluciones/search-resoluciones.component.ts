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
import { DocsResolucionesService } from "projects/app1/src/app/services/docs-resoluciones.service";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
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
      this.infoServ.httpErrorInfo$.next(e.name);

      //TODO to comment and uncomment if necessary for checking response and reload page
      //TODO stopping spinner on http request error
      // this.spinner.requestSpinner$.next(false);
      //TODO to remove only for checking response and reload page
      setTimeout(() => {
        this.window.document.defaultView.location.reload();
      }, 4000);
      return of([]);
    })
  );

  // Observable con el nº total de documentos / Resoluciones / del término de búsqueda
  // docsResolucionesLength$ = this.docsResoluciones.documentosResolucionesLength$;

  /*=====  End of Observables  ======*/

  /*=============================================
 =            Subscriptions            =
 =============================================*/

  // Nos subscribimos al Observable de Documentos acumulados de pagination. Para actualizar en esta sección el filtro global del término de búsqueda.
  // documentosSub: Subscription = this.documentos.documentos$.subscribe();

  /*=====  End of Subscriptions  ======*/

  /*=============================================
=            Error Obj member            =
=============================================*/

  // To Save error message in case Http Request Error
  errorObj;

  /*=====  End of Error Obj member  ======*/

  /*=============================================
     =    Incorporacion Integracion nuevo Filtro 20-04-2021 =
     =============================================*/

  // nombrado$_$ = this.filtroS.config$;

  // formA$_$ = this.filtroS.formGrupo$;

  // nombrado1$_$ = this.filtroS.config1$;

  // formA1$_$ = this.filtroS.formGrupo1$;

  @ViewChildren(FiltroComponent)
  filtrosComp: QueryList<FiltroComponent>;
  someCollap$: Subject<boolean> = new Subject();
  toggleCollapseSub: Subscription;
  infoServSubs:Subscription;

  // filtrosDocumentos;
  filtrosResoluciones;

  // filtroDocumentosSub = this.filtroS
  //   .getFiltrosDocumentos()
  //   .pipe()
  //   .subscribe((data) => {
  //     // console.log(data);
  //     // this.filtrosDocumentos = data;
  //     this.filtrosDocumentos = {
  //       data: data,
  //       clase: "documentos",
  //     };
  //   });

  filtroResolucionesSub:Subscription = this.filtroS
    .getFiltrosResoluciones()
    .pipe()
    .subscribe((data) => {
      // console.log(data);
      this.filtrosResoluciones = {
        data,
        clase: "resoluciones",
      };
    });

  /*=====  End of Incorporacion Integracion nuevo Filtro  ======*/

  constructor(
    // private documentos: DocumentosService,
    // private docsResoluciones: DocsResolucionesService,
    private resoluciones: ResolucionesService,
    // private spinner: SpinnerService,
    //TODO to remove only for checking response and reload page
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
    this.infoServ.infoPath$.next("resoluciones");

    this.infoServSubs=combineLatest([
      this.infoServ.resolucionesInfoAcumLength$,
      this.infoServ.resolucionesInfoTotalLength$,
    ])    
    .pipe(
      tap(data=>{
        let result=data[0]/data[1];
        console.log(`%ccalculando si se puede detener el Scroll en esta página:${result===1}`,'color:gold')
        if(result===1) {
          this.resoluciones.stopScroll$.next(true)
        }
        else {
          this.resoluciones.stopScroll$.next(false)

        }
      })
    )
    .subscribe()

  }

  ngAfterViewInit(): void {
    this.toggleCollapseSub = this.filtrosComp.first.triggerCollapse
      .pipe(
        delay(0),
        map((d) => {
          let allToggles = this.filtrosComp.first.toggles.toArray();
          let someCollap = allToggles.some((tog) => {
            return tog.nativeElement.previousElementSibling.checked;
          });
          // this.someCollap=someCollap;
          this.someCollap$.next(someCollap);
          // console.log(someCollap)
          return of(someCollap);
        })
      )
      .subscribe((d) => {
        // console.log("Estoy abriendo!");
        console.log(d);
      });
  }

  ngOnDestroy(): void {
    // this.documentosSub.unsubscribe();
    // this.filtroEscritosSub.unsubscribe();
    // this.filtroDocumentosSub.unsubscribe();
    this.filtroResolucionesSub.unsubscribe();
    this.toggleCollapseSub.unsubscribe();
    this.infoServSubs.unsubscribe();
  }

  collapsing() {
    console.log("collapsando!!!");
    console.log("Algo hay que hacer");
    let allToggles = this.filtrosComp.first.toggles.toArray();
    let someCollap = allToggles.some((tog) => {
      return tog.nativeElement.previousElementSibling.checked;
    });
    console.log(someCollap);

    allToggles.forEach((tog) => {
      console.log(tog.nativeElement.previousElementSibling.checked);
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
