import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

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
    // return new Promise((res)=>{

    //     setTimeout(() => {
    //         console.log("im going to resolve this document details!!!");
    //     res(true);
    //         // return of({documento:"resuelto",error:false});

    //     }, 2000);
    // })

    return of({
      id: _id,
      descripcion: `descripcion documento ${_id}`,
      tipo_documental: `tipo documental ${_id}`,
      magistrado: `magistrado ${_id}`,
      pdfSrc: `/assets/ejemplo_pdf_3.pdf`,
    }).pipe(delay(1000));
  }
  
}
