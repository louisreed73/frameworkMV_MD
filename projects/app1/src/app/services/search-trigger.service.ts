import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTriggerService {

  newTriggerSearch:Subject<any>= new Subject<any>();
  triggerSearch:Observable<any>=this.newTriggerSearch.asObservable();
  fuzzySearch:Subject<string>=new Subject()

  _updatedFiltro:{[k:string]:any}={};
  _updatedSearch:any={};
  _updatedPagina:number=null;


  set updatedFiltro(v:{[k:string]:any}) {
    console.log("Me acaban de actualizar!!!");
    this._updatedFiltro=v;
    console.log(this.updatedFiltro);
  }

  get updatedFiltro() {
    return this._updatedFiltro
  }
  
  get updatedSearch():any {
    return this._updatedSearch
  }
  set updatedSearch(v:any) {
    console.log("Me acaban de actualizar!!!");
    this._updatedSearch.query=v;
    console.log(this.updatedSearch);
  }

  get updatedPagina() {
    return this._updatedPagina
  }
  
  set updatedPagina(v:number) {
    console.log("Me acaban de actualizar!!!");
    this._updatedPagina=v;
    console.log(this.updatedPagina);
  }

  

  constructor() { 
  }
}
