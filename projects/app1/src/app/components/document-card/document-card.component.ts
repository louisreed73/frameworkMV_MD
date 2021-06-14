import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";

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
    // private route:ActivatedRoute
  ) // private documentosServ: DocumentosService
  {}

  ngOnInit() {
    // console.log(this.route.snapshot.url[0])
  }

  selectedDocument(e) {
    // e.preventDefault();
    console.log(this.documento);
    // this.documentosServ.selectedDocument = this.documento;
    // e.preventDeafult();

    this.router.navigate(
      ["/documento/", this.documento.id]
      // {queryParams:{from:this.documento}}
    );
  }
}
