import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { DocumentoDetailService } from "./documento-detail.service";

@Injectable({
  providedIn: "root",
})
export class DetailDocumentResolveGuard implements Resolve<any> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    let _id = +route.params.id;
    let _route = route;
    let _state = state;
    console.log(route.data);
    // console.log(state);
    console.log(_id);
    console.log("Llamando el resolver!!!");
    // return new Promise((res)=>{

    //     setTimeout(() => {
    //         console.log("im going to resolve this document details!!!");
    //     res(true);
    //         // return of({documento:"resuelto",error:false});

    //     }, 2000);
    // })

    return this.documentDetail.getDocumentById(1);
  }

  constructor(
      private documentDetail:DocumentoDetailService
  ) {

  }
  
}
