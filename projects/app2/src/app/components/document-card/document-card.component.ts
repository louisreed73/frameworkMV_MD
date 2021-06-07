import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DocumentosService } from "projects/app2/src/app/services/documentos.service";

@Component({
  selector: "app-document-card",
  templateUrl: "./document-card.component.html",
  styleUrls: ["./document-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentCardComponent implements OnInit {
  @Input() documento: any;
  constructor(
    private router: Router,
    private documentosServ: DocumentosService
  ) {}

  ngOnInit() {}

  selectedDocument(e) {
    e.preventDefault();
    console.log(this.documento);
    this.documentosServ.selectedDocument = this.documento;
    // e.preventDeafult();

    this.router.navigate(["/documento/", this.documento.id]);
  }
}
