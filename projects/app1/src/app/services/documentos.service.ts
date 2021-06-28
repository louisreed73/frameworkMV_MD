import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import {
  BehaviorSubject,
  combineLatest,
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
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";
import { InfoService } from "./info.service";
import { SearchTriggerService } from "./search-trigger.service";

/**
 *
 * DocumentosService
 * Responsible for search trigger
 * getting Consulta API documents
 *
 */
@Injectable({
  providedIn: "root",
})
export class DocumentosService  {
  /*=============================================
     =            Observables            =
     =============================================*/

  /**
   *
   * input string Observable to receive updated filters
   *   formulariosFiltro$: Subject<object> = new Subject();
   * User Forms Selections - to apply filters Observable to receive input user string
   *
   */
  formularioFiltros$: BehaviorSubject<{ [k: string]: any }> =
    new BehaviorSubject({
      documentos: undefined,
      escritos: undefined,
      resoluciones: undefined,
    });

  /**
   *
   * Observable - to use for passing information to tabs - Acumulated Array length for documents
   * documentosLength$
   */
  documentosLength$: BehaviorSubject<number> = new BehaviorSubject(null);

  /**
   * Observable - to use for passing information to tabs - Total documents of query string
   * documentosTotalQueryLength$
   */
  documentosTotalQueryLength$: BehaviorSubject<number> = new BehaviorSubject(
    null
  );

  /**
   * Observable for disabling scroll handler while in htttp request operations
   * stopScroll$
   */

  stopScroll$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /*=====  End of Observables  ======*/

  /*=============================================
     =            Subscriptions            =
     =============================================*/

  /**
   * Subscription for http request query string
   * documentosTotalQueryLengthS
   */
  // documentosTotalQueryLengthS: Subscription;

  /*=====  End of Subscriptions  ======*/

  /*=============================================
     =            Class members            =
     =============================================*/

  /**
   * query string, received from input user - to save in pipe
   * search
   */
  search;

  /**
   * forms selections of user Filters to apply - to save in pipe
   * formulario
   */
  formulario;

  /**
   * actual pagination number - to save in pipe
   * pagina
   */
  pagina;

  /**
   * page limit for http request pagination - to use in pipe
   * pageLimit
   */
  pageLimit = environment.app.pageLimit;

  /**
   *
   * data saving an array for acumulating pages - to use depending of actual page -acumulated
   *
   */
  data = [];

  /**
   *
   * saving total number of documents for query string - to send in observer of total documents
   * docsQueryTotal
   */
  docsQueryTotal: number;

  /**
   *
   * save url from observable toggling url right and wrong
   *
   */
  //TODO remove only for checking testing wrong url
  // url: string =
  //   "https://my-json-server.typicode.com/louisreed73/fakeAPI/documentos";
  // url: string="/api/documentos";

  /*=====  End of Class members  ======*/

  /**
   * Observable to react to input query string / Form Filters / page change
   * in this pipeline we are going to make http request based in this information
   * Logic to check acumulated data, based in page number - API pagination
   * documentos$
   */
  documentos$: Observable<any>;

  /**
   * Constructor Initializes Component
   */
  constructor(
    private http: HttpClient,
    private searchTrigger: SearchTriggerService,
    private infoServ: InfoService
  ) {
    /**
     * Observable to react to input query string / Form Filters / page change
     * in this pipeline we are going to make http request based in this information
     * Logic to check acumulated data, based in page number - API pagination
     */
    this.documentos$ = this.searchTrigger.newTriggerSearchDocumentos.pipe(
      switchMap((params) => {
        return from([
          this.searchTrigger.updatedFiltro,
          this.searchTrigger.updatedSearch,
          this.searchTrigger.updatedPaginaDocumentos,
        ]).pipe(toArray());
      }),
      tap(([formulario, search, pagina]) => {
        // saving all the data
        this.search = search.query;
        this.formulario = formulario.documentos || {
          tipo_documento: "D",
        };
        this.formulario.tipo_documento = this.formulario.tipo_documento || "D";
        this.pagina = pagina;
        // this.formulario.currentSearch = search.tipo;
        //  this.infoServ.infoPath$.next(search.tipo)
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
        return this.http.post<any>(
          `${environment.app.baseURLApiBuscadorReal}?$init=${this.pagina}&$limit=${this.pageLimit}`,
          this.formulario
          ).pipe(
            tap((documentos)=>{
              //Here we harcoded documentos.metadata.totalDocumentos
              //We must receive total documentos info in metadata
            this.infoServ.documentosInfoTotalLength$.next(4);
            this.stopScroll$.next(true);

          })
        )
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
        this.infoServ.documentosInfoAcumLength$.next(this.data.length);
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
   * Unsubscribe for documentosTotalQueryLengthS Subscription
   * Total Query Dcouments Length
   *
   */
  // ngOnDestroy(): void {
  //   //Unsubscribe from http request query string
  //   // this.documentosTotalQueryLengthS.unsubscribe();
  // }
}
