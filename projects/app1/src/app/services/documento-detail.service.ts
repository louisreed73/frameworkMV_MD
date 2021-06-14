import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

import * as data  from "../../assets/pdf/pdfArray.json";
const url="https://my-json-server.typicode.com/louisreed73/fakeAPIbuscador/documentos";
@Injectable({
  providedIn: "root",
})
export class DocumentoDetailService {
  base64Src:any;
  constructor(private http: HttpClient) {
    this.base64Src=(data as any).default.data;

    console.log(this.base64Src)
  }

  getDocumentById(id: number) {
    console.log("Llamando el método getDocumentById!!!");

    this.http.get(`${url}/${id}`)
    .subscribe(d=>{
      console.log(`%cFakeAPibuscador: ${JSON.stringify(d,null,3)}`,'color:gold')
    })

    return of({
      id: id,
      descripcion: `descripcion documento ${id}`,
      tipo_documental: `tipo documental ${id}`,
      magistrado: `magistrado ${id}`,
      // pdfSrc: `/assets/ejemplo_pdf_3.pdf`,
      pdfSrc: this.base64Src,
    }).pipe(
      delay(1250)
    )
  }


}
