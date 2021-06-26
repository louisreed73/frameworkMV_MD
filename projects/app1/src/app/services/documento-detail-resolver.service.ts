import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { DocumentoDetailService } from "./documento-detail.service";

/**
 *
 * DetailDocumentResolveGuard
 * resolve Guard
 * it fetches documento detail data
 * before go to
 * target route
 *
 */
@Injectable({
  providedIn: "root",
})
export class DetailDocumentResolveGuard implements Resolve<any> {
  /**
   *
   * resolve
   * Method contract for resolver
   * it gets documento from documento-detail
   * service
   * and send it
   * to as documento object
   *
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // let _id = +route.params.id;
    // from 18_DPA to 22_DPA id's returns data
    // const id:string='H_18050813145J04N32J_0339_18_DPA';
    let randomBetween18_22 = Math.round(Math.random() * (22 - 18)) + 18;
    console.log(`%c Valor del Random: ${randomBetween18_22}`, "color:cyan");
    let _id: string =
      "H_18050813145J04N32J_0339_" + randomBetween18_22 + "_DPA";
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

    return this.documentDetail
      .getDocumentById(_id)
      .pipe(tap((data) => data.push(_id)));
    // .pipe(
    //   delay(500)
    // )
  }

  /**
   * Constructor Initializes Service
   *
   */
  constructor(private documentDetail: DocumentoDetailService) {}
}
