import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-document-card",
  templateUrl: "./document-card.component.html",
  styleUrls: ["./document-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentCardComponent {
  @Input() documento: any;
  constructor(private router: Router) {}

  selectedDocument(e) {
    this.router.navigate(["/documento/", this.documento.id]);
  }
}
