import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { combineLatest, of } from "rxjs";
import { delay } from "rxjs/operators";

import * as data from "../../assets/pdf/pdfArray.json";
// const url="https://my-json-server.typicode.com/louisreed73/fakeAPIbuscador/documentos";
// const url = "http://localhost:8080/bjus_rest_buscador/v1/documentos/";



@Injectable({
  providedIn: "root",
})
export class DocumentoDetailService {
  base64Src: any;
  constructor(private http: HttpClient) {
    // this.base64Src=(data as any).default.data;
    // console.log(this.base64Src)
  }

  getDocumentById(id: string) {
    let finalURLMetadatos=environment.app.baseURLApiBuscadorDetailDocument+id+'?tipo_param=metadatos';
    let finalURLContenido=environment.app.baseURLApiBuscadorDetailDocument+id+'?tipo_param=contenido';
    console.log("Llamando el método getDocumentById!!!");
    console.log(finalURLMetadatos);
    console.log(finalURLContenido);


    return combineLatest([
      this.http.get(finalURLMetadatos),
      this.http.get(finalURLContenido),
    ]) 
    // .pipe(
    //   // delay(10000)
    //   );
    // .subscribe(d=>{
    //   this.base64Src=(d as any).data.pdf;
    //   console.log(`%cFakeAPibuscador: ${JSON.stringify(d,null,3)}`,'color:gold')
    // })

    // return of({
    //   id: id,
    //   descripcion: `descripcion documento ${id}`,
    //   tipo_documental: `tipo documental ${id}`,
    //   magistrado: `magistrado ${id}`,
    //   // pdfSrc: `/assets/ejemplo_pdf_3.pdf`,
    //   pdfSrc: this.base64Src,
    // }).pipe(
    //   delay(1250)
    // )
  }
}
