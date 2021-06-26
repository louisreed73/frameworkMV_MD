import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { combineLatest, of } from "rxjs";
import { delay } from "rxjs/operators";

import * as data from "../../assets/pdf/pdfArray.json";
// const url="https://my-json-server.typicode.com/louisreed73/fakeAPIbuscador/documentos";
// const url = "http://localhost:8080/bjus_rest_buscador/v1/documentos/";

/**
 *
 * DocumentoDetailService
 * it makes 2 http calls
 * to get documento detail data
 * from metadatos and data pdf
 * it's implemented by getDocumentById
 * method
 *
 *
 */
@Injectable({
  providedIn: "root",
})
export class DocumentoDetailService {
  // base64Src: any;
  /**
   * Constructor Initializes Service
   *
   */
  constructor(private http: HttpClient) {
    // this.base64Src=(data as any).default.data;
    // console.log(this.base64Src)
  }

  /**
   *
   * getDocumentById
   * method
   * call to API Buscador
   * 2 request to
   * get metadatos - info about documento
   * get contenido - array Bytes pdf
   *
   */
  getDocumentById(id: string) {
    let finalURLMetadatos =
      environment.app.baseURLApiBuscadorDetailDocument +
      id +
      "?tipo_param=metadatos";
    let finalURLContenido =
      environment.app.baseURLApiBuscadorDetailDocument +
      id +
      "?tipo_param=contenido";
    console.log("Llamando el método getDocumentById!!!");
    console.log(finalURLMetadatos);
    console.log(finalURLContenido);

    return combineLatest([
      this.http.get(finalURLMetadatos),
      this.http.get(finalURLContenido),
    ]);
  }
}
