import { Component, OnInit } from "@angular/core";
import { InfoService } from "../../services/info.service";

/**
 *
 * PercentageBarComponent
 * This component render info
 * for the user
 * retrieved documentos-resoluciones-escritos /
 * retrieved total documentos-resoluciones-escritos
 * in the form of a percentage bar
 */
@Component({
  selector: "app-percentage-bar",
  templateUrl: "./percentage-bar.component.html",
  styleUrls: ["./percentage-bar.component.scss"],
})
export class PercentageBarComponent implements OnInit {
  /*=============================================
=            Observables to Subscribe         =
=============================================*/

  /**
   *
   * documentosTotalQueryLength$
   * Recibimos el Observable con los datos
   * del número total de documentos
   * por término de búsqueda.
   *
   */
  documentosTotalQueryLength$ = this.infoS.documentosInfoTotalLength$;

  /**
   *
   * documentosLength$
   * Recibimos el Observable con los datos
   * del número total de documentos filtrados
   * acumulados
   * por término de búsqueda +
   * filtros aplicados o pagination.
   *
   */
  documentosLength$ = this.infoS.documentosInfoAcumLength$;

  /**
   *
   * resolucionesTotalQueryLength$
   * Recibimos el Observable con los datos
   * del número total de resoluciones
   * por término de búsqueda.
   *
   */
  resolucionesTotalQueryLength$ = this.infoS.resolucionesInfoTotalLength$;

  /**
   *
   * resolucionesLength$
   * Recibimos el Observable con los datos
   * del número total de resoluciones filtradas
   * acumulados
   * por término de búsqueda +
   * filtros aplicados o pagination.
   *
   */
  resolucionesLength$ = this.infoS.resolucionesInfoAcumLength$;

  /**
   *
   * escritosTotalQueryLength$
   * Recibimos el Observable con los datos
   * del número total de escritos
   * por término de búsqueda.
   *
   */
  escritosTotalQueryLength$ = this.infoS.escritosInfoTotalLength$;

  /**
   *
   * escritosLength$
   * Recibimos el Observable con los datos
   * del número total de escritos filtrados
   * acumulados
   * por término de búsqueda +
   * filtros aplicados o pagination.
   *
   */
  escritosLength$ = this.infoS.escritosInfoAcumLength$;

  /*=====  Observables to Subscribe End  ======*/

  /**
   *
   * path$
   * string from url
   * necessary for ngIf directives
   * render info for each actual tab
   * or page
   * for use in template
   *
   */
  path$ = this.infoS.infoPath$;

  /**
   * Constructor Initializes Component
   *
   */
  constructor(private infoS: InfoService) {}

  /**
   *
   * Angular Hook
   * On Init of this component logic
   *
   */
  ngOnInit() {}
}
