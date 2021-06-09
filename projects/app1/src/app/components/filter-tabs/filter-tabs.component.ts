import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";

@Component({
  selector: "app-filter-tabs",
  templateUrl: "./filter-tabs.component.html",
  styleUrls: ["./filter-tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTabsComponent implements OnInit {
  /*=============================================
  =            Observables to Subscribe         =
  =============================================*/

  // Recibimos el Observable con los datos del número total de documentos por término de búsqueda.
  documentosTotalQueryLength$ = this.documentos.documentosTotalQueryLength$;
  // Recibimos el Observable con los datos del número total de documentos filtrados por término de búsqueda + filtros aplicados o pagination.
  documentosLength$ = this.documentos.documentosLength$;

  /*=====  Observables to Subscribe End  ======*/

  constructor(private documentos: DocumentosService) {}

  ngOnInit() {}
}
