import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "@environments/environment";
import {
  BehaviorSubject,
  from,
  Observable,
  of,
  Subject,
  Subscription,
  throwError,
} from "rxjs";
import {
  catchError,
  shareReplay,
  startWith,
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";

import { InfoService } from "./info.service";
import { SearchTriggerService } from "./search-trigger.service";

/**
 *
 * Resoluciones Service
 * It's used to get resoluciones
 * calling API Buscador
 * it receives info about updated Page
 * upadated Filters
 * string input user -buscar button trigger-
 * Also it broadcast info about resoluciones
 * acumulated / total resoluciones
 * trough Info Service
 * and run logic
 * to stop scroll event
 *
 */
@Injectable({
  providedIn: "root",
})
export class ResolucionesService {
  /*=============================================
     =            Observables            =
     =============================================*/

  /**
   *
   * inputSearch$
   * input string Observable to
   * receive input user string
   *
   */
  inputSearch$: Subject<string> = new Subject();

  /**
   *
   * formularioFiltros$
   * User Forms Selections
   * - to apply filters Observable
   * to receive input user string
   *
   */
  formularioFiltros$: BehaviorSubject<{ [k: string]: any }> =
    new BehaviorSubject({
      documentos: undefined,
      escritos: undefined,
      resoluciones: undefined,
    });
  // Actual page Observable - pagination for http request - actual page
  // pagina$: Subject<number> = new Subject();

  /**
   *
   * documentosLength$
   * Observable - to use for passing
   * information to tabs -
   * Acumulated Array length for documents
   *
   */
  // documentosLength$: BehaviorSubject<number> = new BehaviorSubject(null);
  // Observable - to use for passing information to tabs - Total documents of query string
  // documentosTotalQueryLength$: BehaviorSubject<number> = new BehaviorSubject(
  //   null
  // );

  /**
   *
   * stopScroll$
   * Observable for
   * disabling scroll handler
   * while in htttp request operations
   *
   */
  stopScroll$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //TODO remove only for checking testing wrong url
  // Observable for checking http request Error
  // url$: BehaviorSubject<string> = new BehaviorSubject(
  //      "https://my-json-server.typicode.com/louisreed73/fakeAPI/documentos"
  // );

  /*=====  End of Observables  ======*/

  /*=============================================
     =            Subscriptions            =
     =============================================*/

  /**
   *
   * resolucionesTotalQueryLengthS
   * Subscription for http request query string
   *
   */
  // resolucionesTotalQueryLengthS: Subscription;

  /*=====  End of Subscriptions  ======*/

  /*=============================================
     =            Class members            =
     =============================================*/

  /**
   *
   * search
   * query string, received from
   * input user - to save in pipe
   *
   */
  search;

  /**
   *
   * formulario
   * forms selections of user
   * Filters to apply - to save in pipe
   *
   */
  formulario;

  /**
   *
   * pagina
   * actual pagination number - to save in pipe
   *
   */
  pagina;

  /**
   *
   * pageLimit
   * page limit for http request pagination
   * to use in pipe
   *
   */
  pageLimit = environment.app.pageLimit;

  /**
   *
   * data
   * saving an array for acumulating pages
   * to use depending of actual page - acumulated
   *
   */
  data = [];

  /**
   *
   * resolucionesQueryTotal:
   * saving total number of resoluciones
   * for query string - to send in observer
   * of total resoluciones
   *
   */
  resolucionesQueryTotal: number;

  //TODO remove only for checking testing wrong url
  // save url from observable toggling url right and wrong
  // url: string =
  //   "https://my-json-server.typicode.com/louisreed73/fakeAPI/resoluciones";
  // url: string="/api/documentos";

  /*=====  End of Class members  ======*/

  /**
   *
   * resoluciones$
   * Observable to react to input query string
   * / Form Filters / page change - Resoluciones
   * in this pipeline we are going to make http
   * request based in this information
   * Logic to check acumulated data,
   * based in page number - API pagination
   *
   */
  resoluciones$: Observable<any>;

  // get selectedDocument() {
  //   return this._selectedDocument;
  // }

  // set selectedDocument(doc: any) {
  //   this._selectedDocument = doc;

  // }

  /**
   * Constructor Initializes Component
   */
  constructor(
    private http: HttpClient,
    private searchTrigger: SearchTriggerService,
    private infoServ: InfoService
  ) {
    this.resoluciones$ = this.searchTrigger.newTriggerSearchResoluciones.pipe(
      switchMap((params) => {
        return from([
          this.searchTrigger.updatedFiltro,
          this.searchTrigger.updatedSearch,
          this.searchTrigger.updatedPaginaResoluciones,
        ]).pipe(toArray());
      }),
      tap(([formulario, search, pagina]) => {
        // saving all the data
        this.search = search.query;
        this.formulario = formulario.resoluciones || {
          tipo_documento: "R",
        };
        this.formulario.tipo_documento = this.formulario.tipo_documento || "R";
        this.formulario.search = this.search;
        this.pagina = pagina;
        // this.formulario.currentSearch = search.tipo;
        console.log(
          `%cEsto es lo que recibo de los filtros: ${JSON.stringify(
            this.formulario,
            null,
            3
          )}`,
          "color:gold"
        );
        console.log(
          `%cEsto es lo que recibo de los filtros: ${JSON.stringify(
            this.pagina,
            null,
            3
          )}`,
          "color:gold"
        );
        console.log(
          `%cEsto es lo que recibo de los filtros: ${JSON.stringify(
            this.search,
            null,
            3
          )}`,
          "color:gold"
        );
      }),
      switchMap((obsCombined) => {
        // if page is 1 / we send new data with the new string query -or change in filters - new API request - to get total documents
        // if (this.pagina < 2) {
        //   this.documentosTotalQueryLengthS = combineLatest([
        //     this.http.get<any>(
        //       `${environment.app.baseURLApiBuscador + "/documentos"}?q=${
        //         this.search
        //       }`
        //     ),
        //     this.http.post<any>(
        //       `${environment.app.baseURLApiBuscadorReal}?$init=${this.pagina}&$limit=${this.pageLimit}`,
        //       this.formulario
        //     ),
        //   ]).subscribe(([fake, realAPI]) => {
        //     console.log(fake, realAPI);
        //     // this.docsQueryTotal = realAPI.data.length;
        //     // this.infoServ.documentosInfoTotalLength$.next(4);
        //   });
        // }

        // during this operation we cannot trigger scroll handler to prevent more API calls

        // we return observable with API call with pagination
        return this.http
          .post<any>(
            `${environment.app.baseURLApiBuscadorReal}?$init=${this.pagina}&$limit=${this.pageLimit}`,
            this.formulario
          )
          .pipe(
            tap((documentos) => {
              //Here we harcoded documentos.metadata.totalDocumentos
              //We must receive total resoluciones info in metadata
              this.infoServ.resolucionesInfoTotalLength$.next(4);
              this.stopScroll$.next(true);
            })
          );
      }),
      catchError((err) => {
        //Error throwing to handle data in each observable pipe
        return throwError(err);
      }),
      switchMap(({ metadata, data }) => {
        console.log(metadata, data);
        //Depending of page number we overwrite acumulated array or inserting more documents based on query string and filters
        if (this.pagina < 2) {
          this.data = data;
        }
        if (this.pagina > 1) {
          this.data = this.data.concat(data);
        }
        // returning acumulated array as observable // saved in data class member;
        this.infoServ.resolucionesInfoAcumLength$.next(this.data.length);
        return of(this.data);
      }),
      //cache of acumulated array of documents - pagination
      shareReplay(1)
    );
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * Unsubscribe for resolucionesTotalQueryLengthS
   * Subscription
   * Total Query Resoluciones Length
   *
   */
  // ngOnDestroy(): void {
  //   //Unsubscribe from http request query string
  //   this.resolucionesTotalQueryLengthS.unsubscribe();
  // }
}
