import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

/**
 *
 * SearchTriggerService
 * Responsible for search trigger
 * setting page API consulta for each documentos type;
 * Documentos / Resoluciones / Escritos
 * setting filter updated for API consulta each filter specific
 * setting search query
 * fuzzySearch trigger
 *
 *
 */
@Injectable({
  providedIn: "root",
})
export class SearchTriggerService {
  /**
   *
   * Subject for trigger Consulta API in documentos
   * newTriggerSearchDocumentos
   *
   */
  newTriggerSearchDocumentos: Subject<any> = new Subject<any>();

  /**
   *
   * Converting Subject into Observable for trigger Consulta API in documentos
   * triggerSearchDocumentos
   *
   */
  triggerSearchDocumentos: Observable<any> =
    this.newTriggerSearchDocumentos.asObservable();

  /**
   *
   * Subject for trigger Consulta API in escritos
   * newTriggerSearchEscritos
   *
   */
  newTriggerSearchEscritos: Subject<any> = new Subject<any>();

  /**
   *
   * Converting Subject into Observable for trigger Consulta API in escritos
   * triggerSearchDocumentos
   *
   */
  triggerSearchEscritos: Observable<any> =
    this.newTriggerSearchEscritos.asObservable();

  /**
   *
   * Subject for trigger Consulta API in resoluciones
   * newTriggerSearchResoluciones
   *
   */
  newTriggerSearchResoluciones: Subject<any> = new Subject<any>();

  /**
   *
   * Converting Subject into Observable for trigger Consulta API in resoluciones
   * triggerSearchResoluciones
   *
   */
  triggerSearchResoluciones: Observable<any> =
    this.newTriggerSearchResoluciones.asObservable();

  /**
   *
   * fuzzySearch trigger for Snippets in detail document
   *
   */
  fuzzySearch: Subject<string> = new Subject();

  /**
   *
   * class memeber for getters and setters
   * of updated Filter
   * property Bag
   * _updatedFiltro
   *
   */
  _updatedFiltro: { [k: string]: any } = {};

  /**
   *
   * class memeber for getters and setters
   * of updated Search query String
   * property Bag
   * _updatedSearch
   *
   */
  _updatedSearch: any = {};

  /**
   *
   * class memeber for getters and setters
   * of updated Page Documentos
   * property Bag
   * _updatedPaginaDocumentos
   *
   */
  _updatedPaginaDocumentos: number = null;

  /**
   *
   * class memeber for getters and setters
   * of updated Page Resoluciones
   * property Bag
   * _updatedPaginaResoluciones
   *
   */
  _updatedPaginaResoluciones: number = null;

  /**
   *
   * class memeber for getters and setters
   * of updated Page Escritos
   * property Bag
   * _updatedPaginaEscritos
   *
   */
  _updatedPaginaEscritos: number = null;

  /**
   *
   * setter for Updated Filtro
   * updatedFiltro
   *
   */
  set updatedFiltro(v: { [k: string]: any }) {
    this._updatedFiltro = v;
  }

  /**
   *
   * getter for Updated Filtro
   * updatedFiltro
   *
   */
  get updatedFiltro() {
    return this._updatedFiltro;
  }

  /**
   *
   * setter for Updated Search query String
   * updatedSearch
   *
   */
  set updatedSearch(v: any) {
    this._updatedSearch.query = v;
  }

  /**
   *
   * getter for Search query String
   * updatedSearch
   *
   */
  get updatedSearch(): any {
    return this._updatedSearch;
  }

  /**
   *
   * setter for Updated Page Documentos consulta API
   * updatedPaginaDocumentos
   *
   */
  set updatedPaginaDocumentos(v: number) {
    this._updatedPaginaDocumentos = v;
  }

  /**
   *
   * getter for Updated Page Documentos consulta API
   * updatedPaginaDocumentos
   *
   */
  get updatedPaginaDocumentos() {
    return this._updatedPaginaDocumentos;
  }

  /**
   *
   * setter for Updated Page Resoluciones consulta API
   * updatedPaginaResoluciones
   *
   */
  set updatedPaginaResoluciones(v: number) {
    this._updatedPaginaResoluciones = v;
  }

  /**
   *
   * getter for Updated Page Resoluciones consulta API
   * updatedPaginaResoluciones
   *
   */
  get updatedPaginaResoluciones() {
    return this._updatedPaginaResoluciones;
  }

  /**
   *
   * setter for Updated Page Escritos consulta API
   * updatedPaginaEscritos
   *
   */
  set updatedPaginaEscritos(v: number) {
    this._updatedPaginaEscritos = v;
  }

  /**
   *
   * getter for Updated Page Escritos consulta API
   * updatedPaginaEscritos
   *
   */
  get updatedPaginaEscritos() {
    return this._updatedPaginaEscritos;
  }

  /**
   *
   * Constructor Initializes Service
   *
   */
  constructor() {}
}
