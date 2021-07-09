import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  combineLatest,
  from,
  of,
  Subject,
  Subscription,
} from "rxjs";
import { shareReplay, switchMap, toArray } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  config1,
  config2,
  config3,
  form1,
  form2,
  form3,
} from "../formulariosFiltrado/formulariosFiltrado.data";

/**
 * FiltrosService
 * it fetches API Catalogos
 * calls to get all Filters
 * mainly autocomplete options
 * It also run a configuration
 * from imported configuration data
 * an create Form Groups
 *
 */
@Injectable({
  providedIn: "root",
})
export class FiltrosService implements OnDestroy {
  /**
   *
   * reqValoresDocumentosSub
   * Subscription for http Client
   * in order to get all Filters data
   * from API Catalogos
   *
   */
  reqValoresDocumentosSub: Subscription;
  // reqValoresResolucionesSub: Subscription;
  // reqValoresEscritosSub: Subscription;

  /**
   *
   * showFilters$
   * Subject to broadcast
   * if all filters for each page
   * Documentos - Escritos - Resoluciones
   * is ready
   *
   */
  showFilters$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // triggerCollapse: Subject<any> = new Subject();

  // documentosCache: any[];

  /**
   * Constructor Initializes Service
   *
   */
  constructor(private http: HttpClient) {
    // API Catalogos call
    this.getRequestValoresDocumentos();
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * We unsubscribe from reqValoresDocumentosSub
   * Subscription
   *
   */
  ngOnDestroy(): void {
    this.reqValoresDocumentosSub.unsubscribe();
    // this.reqValoresEscritosSub.unsubscribe();
  }

  /**
   *
   * getRequestValoresDocumentos
   * method
   * Actual method to get Filters
   * and run logic to map configuration
   * of filters data
   * and create FormGroups for each page
   * Documentos - Escritos - Resoluciones
   *
   */
  getRequestValoresDocumentos() {
    this.reqValoresDocumentosSub = combineLatest([
      this.http.get<any>(
        `${environment.app.baseURLApiCatalogos}/tipos-documentales?$orderby=+descripcion`
      ),
      from([
        {
          data: {
            cualquiera: [
              { codigo: null, descripcion: "desde" },
              { codigo: null, descripcion: "hasta" },
            ],
          },
        },
      ]),
      this.http.get<any>(
        `${environment.app.baseURLApiCatalogos}/tipos-procedimientos?$orderby=+descripcion`
      ),
      from([
        {
          data: {
            cualquiera: [
              { codigo: null, descripcion: "numero" },
              { codigo: null, descripcion: "año" },
            ],
          },
        },
      ]),
      this.http.get<any>(`${environment.app.baseURLApiCatalogos}/magistrados?$orderby=+descripcion`),
      this.http.get<any>(
        `${environment.app.baseURLApiCatalogos}/tipos-escritos?$orderby=+descripcion`
      ),
    ])
      .pipe(
        switchMap((data) => {
          return data.map((itemData, ind) => {
            return itemData.data[Object.keys(data[ind].data)[0]].map((it) =>
              it.descripcion.toLowerCase()
            );
          });
        }),
        toArray(),
        shareReplay(1)
      )
      .subscribe((data) => {
        console.log(data);
        data.slice(0, data.length - 1).forEach((filtro, index) => {
          this.creaConfig(data, index, config1);
        });

        data.push(["desde", "hasta"]);

        data.forEach((filtro, index) => {
          this.creaConfig(data, index, config3);
        });
        let dataRes = data.slice(0, data.length - 2);
        dataRes.push(["auto", "sentencia"], ["desde", "hasta"]);

        dataRes.forEach((filtro, index) => {
          this.creaConfig(dataRes, index, config2);
        });

        this.showFilters$.next(true);
      });
  }

  /**
   *
   * creaConfig
   * method
   * set final FormGroups
   * key value names, controls
   * from configuration data
   *
   */
  creaConfig(reqVal, reqValNumb, configVar) {
    let datosReq = [];
    reqVal[reqValNumb].forEach((item) => {
      datosReq.push(item);
    });
    configVar[reqValNumb].values = datosReq;
  }

  /**
   *
   * getFiltrosDocumentos
   * method
   * Utility function of this service
   * to return observable with
   * final configuration and
   * FormsGroups of each page
   * Documentos
   *
   */
  getFiltrosDocumentos() {
    return of([config1, form1]);
  }

  /**
   *
   * getFiltrosResoluciones
   * method
   * Utility function of this service
   * to return observable with
   * final configuration and
   * FormsGroups of each page
   * Resoluciones
   *
   */
  getFiltrosResoluciones() {
    return of([config2, form2]);
  }

  /**
   *
   * getFiltrosEscritos
   * method
   * Utility function of this service
   * to return observable with
   * final configuration and
   * FormsGroups of each page
   * Escritos
   *
   */
  getFiltrosEscritos() {
    return of([config3, form3]);
  }
}
