import { Component, OnInit } from "@angular/core";
import { DocumentosService } from "projects/app2/src/app/services/documentos.service";

@Component({
  selector: "app-percentage-bar",
  templateUrl: "./percentage-bar.component.html",
  styleUrls: ["./percentage-bar.component.scss"],
})
export class PercentageBarComponent implements OnInit {
  /*=============================================
=            Observables to Subscribe         =
=============================================*/

  // Recibimos el Observable con los datos del número total de documentos por término de búsqueda.
  documentosTotalQueryLength$ = this.documentos.documentosTotalQueryLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados o pagination.
  documentosLength$ = this.documentos.documentosLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados. 'Solo Escritos'!!!
  // escritosLength$ = this.docsEscritos.documentosEscritosLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados. 'Solo Resoluciones'!!!
  // resolucionesLength$ = this.docsResoluciones.documentosResolucionesLength$;

  /*=====  Observables to Subscribe End  ======*/

  constructor(
    private documentos: DocumentosService // private docsEscritos: DocsEscritosService,
  ) // private docsResoluciones: DocsResolucionesService
  {}

  ngOnInit() {}
}
