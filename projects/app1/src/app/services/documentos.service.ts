import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
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
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";
import { InfoService } from "./info.service";
import { SearchTriggerService } from "./search-trigger.service";

@Injectable({
  providedIn: "root",
})
export class DocumentosService implements OnDestroy {
  /*=============================================
     =            Observables            =
     =============================================*/

  // input string Observable to receive input user string
  //   inputSearch$: Subject<string> = new Subject();
  // User Forms Selections - to aplly filters Observable to receive input user string
  formularioFiltros$: BehaviorSubject<{ [k: string]: any }> =
    new BehaviorSubject({
      documentos: undefined,
      escritos: undefined,
      resoluciones: undefined,
    });
  // Actual page Observable - pagination for http request - actual page
  //  pagina$: Subject<number> = new Subject();

  // Observable - to use for passing information to tabs - Acumulated Array length for documents
  documentosLength$: BehaviorSubject<number> = new BehaviorSubject(null);
  // Observable - to use for passing information to tabs - Total documents of query string
  documentosTotalQueryLength$: BehaviorSubject<number> = new BehaviorSubject(
    null
  );
  // Observable for disabling scroll handler while in htttp request operations
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

  //Subscription for http request query string
  documentosTotalQueryLengthS: Subscription;

  /*=====  End of Subscriptions  ======*/

  /*=============================================
     =            Class members            =
     =============================================*/

  // query string, received from input user - to save in pipe
  search;

  // forms selections of user Filters to apply - to save in pipe
  formulario;
  // actual pagination number - to save in pipe
  pagina;

  // page limit for http request pagination - to use in pipe
  pageLimit = 5;
  // saving an array for acumulating pages - to use depending of actual page -acumulated
  data = [];
  // saving total number of documents for query string - to send in observer of total documents
  docsQueryTotal: number;

  //TODO remove only for checking testing wrong url
  // save url from observable toggling url right and wrong
  url: string =
    "https://my-json-server.typicode.com/louisreed73/fakeAPI/documentos";
  // url: string="/api/documentos";

  /*=====  End of Class members  ======*/

  // Observable to react to input query string / Form Filters / page change
  // in this pipeline we are going to make http request based in this information
  // Logic to check acumulated data, based in page number - API pagination
  documentos$: Observable<any>;
  // private _selectedDocument: any;

  // get selectedDocument() {
  //   return this._selectedDocument;
  // }

  // set selectedDocument(doc: any) {
  //   this._selectedDocument = doc;
  //   console.log(
  //     `%c Nuevo Documento a visualizar!!!: ${JSON.stringify(
  //       this._selectedDocument,
  //       null,
  //       2
  //     )}`,
  //     "color:lime"
  //   );
  // }

  constructor(
    private http: HttpClient,
    private searchTrigger: SearchTriggerService,
    private infoServ: InfoService
  ) {
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
        this.formulario = formulario;
        this.pagina = pagina;
        this.formulario.currentSearch = search.tipo;
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
        if (this.pagina < 2) {
          this.documentosTotalQueryLengthS = this.http
            .get<any>(`${this.url}?q=${this.search}`)
            .subscribe((d) => {
              this.docsQueryTotal = d.length;
              this.infoServ.documentosInfoTotalLength$.next(d.length);
            });
        }

        // during this operation we cannot trigger scroll handler to prevent more API calls
        this.stopScroll$.next(true);

        // we return observable with API call with pagination
        return this.http.get<any>(
          `${this.url}?q=${this.search}&_page=${this.pagina}&_limit=${this.pageLimit}`
        );
      }),
      catchError((err) => {
        //Error throwing to handle data in each observable pipe
        return throwError(err);
      }),
      switchMap((obsPagination) => {
        //Depending of page number we overwrite acumulated array or inserting more documents based on query string and filters
        if (this.pagina < 2) {
          this.data = obsPagination;
        }
        if (this.pagina > 1) {
          this.data = this.data.concat(obsPagination);
        }
        // returning acumulated array as observable // saved in data class member;
        this.infoServ.documentosInfoAcumLength$.next(this.data.length);
        return of(this.data);
      }),
      //cache of acumulated array of documents - pagination
      shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    //Unsubscribe from http request query string
    this.documentosTotalQueryLengthS.unsubscribe();
  }
}
