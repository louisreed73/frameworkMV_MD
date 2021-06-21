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
import { EscritosService } from "../../../services/escritos.service";

/**
 *
 * SearchEscritosComponent
 * Responsible for
 * receiving escritos API consulta
 * receive Observable with escritos: docsEscritos$
 * receiving specific API catalogos filter form for escritos
 * received from Filters Service getFiltrosEscritos method
 *
 * It's also responsible for clearing filters,
 * Filters toggle funcionality
 * and hide filters: Minimal Layout funcionality
 */
@Component({
  selector: "app-search-escritos",
  templateUrl: "./search-escritos.component.html",
  styleUrls: ["./search-escritos.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchEscritosComponent implements OnDestroy, AfterViewInit {
  /*=============================================
    =            Observables            =
    =============================================*/

  /**
   *
   * Recibimos el Observable con los datos
   * del número total de escritos por término
   * de búsqueda acumulado en pagination.
   * docsEscritos$
   */
  docsEscritos$ = this.escritos.escritos$.pipe(
    catchError((e: any) => {
      // this.infoServ.httpErrorInfo$.next(e.name);
      //TODO to comment and uncomment if necessary for checking response and reload page
      //TODO stopping spinner on http request error

      //TODO to remove only for checking response and reload page
      // setTimeout(() => {
      //   this.window.document.defaultView.location.reload();
      // }, 4000);
      return of([]);
    })
  );

  // Observable con el nº total de documentos / Escritos / del término de búsqueda
  // docsEscritosLength$ = this.docsEscritos.documentosEscritosLength$;

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
  //Todo remove this
  // errorObj;

  /*=====  End of Error Obj member  ======*/

  /*=============================================
     =    Incorporacion Integracion nuevo Filtro 20-04-2021 =
     =============================================*/

  /**
   *
   *
   * Getting filtro component in order
   * to clean filters and collapse all/ uncollapse.
   * filtrosComp
   */
  @ViewChildren(FiltroComponent)
  filtrosComp: QueryList<FiltroComponent>;

  /**
   *
   * Subject for broadcast if
   * some filter is collapsed or not
   * someCollap$
   */
  someCollap$: Subject<boolean> = new Subject();

  /**
   *
   * Subscription for combineLatest
   * observables receiving acumulated
   * escritos / total escritos in order
   * to stop scroll or not;
   */
  toggleCollapseSub: Subscription;

  /**
   *
   * Subscription for broadcast
   * escritos / total escritos length
   * infoServSubs
   */
  infoServSubs: Subscription;

  /**
   *
   * Cache of element containing scrolling event
   * in order to implement scroll infinite utility
   * elementScrollTrigger
   */
  elementScrollTrigger = this.window.document.querySelector(
    "mat-sidenav-content"
  );

  /**
   *
   * Storing actual filters of escritos
   * from filtros service an his method
   * filtrosEscritos
   *
   */
  filtrosEscritos;

  /**
   *
   * Subscription
   * Filtros Service
   * return Filters of Escritos
   * to pass to filtro Component
   * filtroEscritosSub
   */
  filtroEscritosSub: Subscription = this.filtroS
    .getFiltrosEscritos()
    .pipe()
    .subscribe((data) => {
      this.filtrosEscritos = {
        data,
        clase: "escritos",
      };
    });

  /**
   *
   * minimalLayout boolean class member
   * to implement ng classes directives
   * implements minimal layout funcionality
   * _minimalLayoutToggle
   */
  private _minimalLayoutToggle: boolean = false;

  /*=====  End of Incorporacion Integracion nuevo Filtro  ======*/

  /**
   * Constructor Initializes Component
   * @param escritos {Escritos Service}
   * get escritos for this actual search
   *
   * @param window {window global object}
   *
   * @param filtroS {Filtros Service}
   * get filtros of escritos
   *
   * @param infoServ {Info Service}
   * getting info about acumulated and
   * total escritos from consulta API
   *
   */
  constructor(
    private escritos: EscritosService,
    @Inject(Window) private window: Window,
    public filtroS: FiltrosService,
    private infoServ: InfoService
  ) {}

  /**
   *
   * Método para comprobar que
   * los datos del Observable son efectivamente un array
   *
   */
  isArray(obj) {
    return Array.isArray(obj);
  }

  /**
   *
   * Angular Hook
   * On Init of this component logic
   * checking if all escritos
   * are received to stop scroll
   *
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // sending subject with actual tab open
    this.infoServ.infoPath$.next("escritos");

    // checking if all escritos are received --> stopScroll / if not not stopping Scroll
    this.infoServSubs = combineLatest([
      this.infoServ.escritosInfoAcumLength$,
      this.infoServ.escritosInfoTotalLength$,
    ])
      .pipe(
        tap((data) => {
          let result = data[0] / data[1];
          if (result === 1) {
            this.escritos.stopScroll$.next(true);
          } else {
            this.escritos.stopScroll$.next(false);
          }
        })
      )
      .subscribe();
  }

  /**
   *
   * Angular Hook
   * On After View of this component logic
   * implementing toggle of escritos
   * filters
   */
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
          // this.someCollap=someCollap;
          this.someCollap$.next(someCollap);

          //Todo remove this
          // return of(someCollap);
        })
      )
      .subscribe((d) => {});
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * unsubscribing from Subscriptions
   * Component
   */
  ngOnDestroy(): void {
    // this.documentosSub.unsubscribe();
    // this.filtroDocumentosSub.unsubscribe();
    this.filtroEscritosSub.unsubscribe();
    this.toggleCollapseSub.unsubscribe();
    this.infoServSubs.unsubscribe();
  }

  /**
   *
   * actual method for toggle collapse/uncollapse filters
   *
   */
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

  /**
   *
   * actual method for reset all filters values
   *
   */
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

  /**
   *
   * actual method for hiding escritos
   * Filters container
   * check if some filter is collapsed --> uncollapse
   * otherwise collapse all filters
   */
  minimalLayoutToggle() {
    let allToggles = this.filtrosComp.first.toggles.toArray();
    let someCollap = allToggles.some((tog) => {
      return tog.nativeElement.previousElementSibling.checked;
    });

    if (this._minimalLayoutToggle && someCollap) {
      this.collapsing();
    }

    this._minimalLayoutToggle = !this._minimalLayoutToggle;
  }
}
