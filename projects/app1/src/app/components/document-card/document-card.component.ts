import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";

/**
 *
 * DocumentCardComponent
 * Responsible for rendering cards of Consulta API documents
 */
@Component({
  selector: "app-document-card",
  templateUrl: "./document-card.component.html",
  styleUrls: ["./document-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentCardComponent {
  /**
   *
   * documento object data, reflect consulta API specific document
   * from Array
   * documento
   */
  @Input() documento: any;

  /**
   *
   * Constructor, initializes Component
   *
   */
  constructor(private router: Router) {}

  /**
   *
   * Method to navigate to documento specific
   * document id, rendering pdf data
   * an other information
   * @param e {Event}
   * @returns void
   */
  selectedDocument(e) {
    this.router.navigate(["/documento/", this.documento.id]);
  }
}
