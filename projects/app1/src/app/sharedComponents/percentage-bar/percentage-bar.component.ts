import { Component, OnInit } from "@angular/core";
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
  resolucionesTotalQueryLength$ = this.infoS.resolucionesInfoTotalLength$;
  // Recibimos el Observable con los datos del número total de resoluciones filtrados por término de búsqueda + filtros aplicados o pagination.
  resolucionesLength$ = this.infoS.resolucionesInfoAcumLength$;
  escritosTotalQueryLength$ = this.infoS.escritosInfoTotalLength$;
  // Recibimos el Observable con los datos del número total de resoluciones filtrados por término de búsqueda + filtros aplicados o pagination.
  escritosLength$ = this.infoS.escritosInfoAcumLength$;
  path$ = this.infoS.infoPath$;

  /*=====  Observables to Subscribe End  ======*/
  // routePath:string = "";
  constructor(private infoS: InfoService) {}

  ngOnInit() {}
}
