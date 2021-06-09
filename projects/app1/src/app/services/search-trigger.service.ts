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
    console.log("Me acaban de actualizar!!!");
    this._updatedFiltro = v;
    console.log(this.updatedFiltro);
  }

  get updatedFiltro() {
    return this._updatedFiltro;
  }

  get updatedSearch(): any {
    return this._updatedSearch;
  }
  set updatedSearch(v: any) {
    console.log("Me acaban de actualizar!!!");
    this._updatedSearch.query = v;
    console.log(this.updatedSearch);
  }

  get updatedPaginaDocumentos() {
    return this._updatedPaginaDocumentos;
  }

  set updatedPaginaDocumentos(v: number) {
    console.log("Me acaban de actualizar!!!");
    this._updatedPaginaDocumentos = v;
    console.log(this.updatedPaginaDocumentos);
  }
  get updatedPaginaResoluciones() {
    return this._updatedPaginaResoluciones;
  }

  set updatedPaginaResoluciones(v: number) {
    console.log("Me acaban de actualizar!!!");
    this._updatedPaginaResoluciones = v;
    console.log(this.updatedPaginaResoluciones);
  }
  get updatedPaginaEscritos() {
    return this._updatedPaginaEscritos;
  }

  set updatedPaginaEscritos(v: number) {
    console.log("Me acaban de actualizar!!!");
    this._updatedPaginaEscritos = v;
    console.log(this.updatedPaginaEscritos);
  }

  constructor() {}
}
