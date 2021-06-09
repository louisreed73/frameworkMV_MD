import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { InfoService } from "../../services/info.service";

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
  documentosTotalQueryLength$ = this.infoS.documentosInfoTotalLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados o pagination.
  documentosLength$ = this.infoS.documentosInfoAcumLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados. 'Solo Escritos'!!!
  // escritosLength$ = this.docsEscritos.documentosEscritosLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados. 'Solo Resoluciones'!!!
  // resolucionesLength$ = this.docsResoluciones.documentosResolucionesLength$;

  /*=====  Observables to Subscribe End  ======*/
  // routePath:string = ""; 
  constructor(
    // private documentos: DocumentosService, // private docsEscritos: DocsEscritosService, // private docsResoluciones: DocsResolucionesService
    // private location: Location,
    private infoS:InfoService,
    private route:ActivatedRoute
    
  ) {
    // this.routePath=this.location.path().replace(/\//, "");
  }

  ngOnInit() {
    // this.route.url.subscribe(d=>{
    //   console.log(d)
    // })
  }
}
