import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchTriggerService {
  newTriggerSearchDocumentos: Subject<any> = new Subject<any>();
  triggerSearchDocumentos: Observable<any> =
    this.newTriggerSearchDocumentos.asObservable();
  newTriggerSearchEscritos: Subject<any> = new Subject<any>();
  triggerSearchEscritos: Observable<any> =
    this.newTriggerSearchEscritos.asObservable();
  newTriggerSearchResoluciones: Subject<any> = new Subject<any>();
  triggerSearchResoluciones: Observable<any> =
    this.newTriggerSearchResoluciones.asObservable();
  fuzzySearch: Subject<string> = new Subject();

  _updatedFiltro: { [k: string]: any } = {};
  _updatedSearch: any = {};
  _updatedPaginaDocumentos: number = null;
  _updatedPaginaResoluciones: number = null;
  _updatedPaginaEscritos: number = null;

  set updatedFiltro(v: { [k: string]: any }) {
    this._updatedFiltro = v;
  }

  get updatedFiltro() {
    return this._updatedFiltro;
  }

  get updatedSearch(): any {
    return this._updatedSearch;
  }
  set updatedSearch(v: any) {
    this._updatedSearch.query = v;
  }

  get updatedPaginaDocumentos() {
    return this._updatedPaginaDocumentos;
  }

  set updatedPaginaDocumentos(v: number) {
    this._updatedPaginaDocumentos = v;
  }
  get updatedPaginaResoluciones() {
    return this._updatedPaginaResoluciones;
  }

  set updatedPaginaResoluciones(v: number) {
    this._updatedPaginaResoluciones = v;
  }
  get updatedPaginaEscritos() {
    return this._updatedPaginaEscritos;
  }

  set updatedPaginaEscritos(v: number) {
    this._updatedPaginaEscritos = v;
  }

  constructor() {}
}
