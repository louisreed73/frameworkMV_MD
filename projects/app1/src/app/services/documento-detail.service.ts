import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DocumentoDetailService {
  constructor(private http: HttpClient) {}

  getDocumentById(id: number) {
    console.log("Llamando el método getDocumentById!!!");

    return of({
      id: id,
      descripcion: `descripcion documento ${id}`,
      tipo_documental: `tipo documental ${id}`,
      magistrado: `magistrado ${id}`,
      pdfSrc: `/assets/ejemplo_pdf_3.pdf`,
    }).pipe(
      delay(1250)
    )
  }
}
