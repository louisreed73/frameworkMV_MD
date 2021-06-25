import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { DocumentoMetadata } from "../../interfaces/documento-metadata";

/**
 *
 * ResumeDocumentComponent
 * 
 *
 */
@Component({
  selector: "app-resume-document",
  templateUrl: "./resume-document.component.html",
  styleUrls: ["./resume-document.component.scss"],
})
export class ResumeDocumentComponent implements OnInit {
  @Input() documento: any;
  // fuzzyString: string;
  pdfDownload_Name: string;
  pdfDownload_Src: string = "";
  currentID: number;
  documentoData: DocumentoMetadata;
  coincidencias: Array<string>;
  constructor(
    // private searchTriggerServ: SearchTriggerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentID =
      +this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    // console.log(JSON.stringify(this.documento));
    // this.pdfDownload_Name = `documento_${this.documento.id}.pdf`;
    // console.log(
    //   `%c Los metadatos son estos: ${JSON.stringify(
    //     this.documento[0],
    //     null,
    //     3
    //   )}`,
    //   "color:gold"
    // );
    this.documentoData = this.documento[0].data;
    console.log(this.documentoData.data)
    this.pdfDownload_Name = `documento_${this.currentID}.pdf`;
    this.pdfDownload_Src =
      "data:application/pdf;base64," + this.documento[1].data.pdf;
    // this.coincidencias=this.documento.coincidencias;
    this.coincidencias = [
      "maria",
      "cesar",
      "constituir",
      "representacion",
      "al mismo",
      "alvarez",
      "comunicacion",
      "intervienen",
      "tuyu",
      "a contar",
      "cristina de cea",
      "La Junta General podrá optar alternativamente por cualquiera de ellos, sin necesidad de modificación estatutaria.",
    ];
    // console.log(this.pdfDownload_Name);
    // console.log(this.pdfDownload_Src);
  }

  // fuzzySearch() {
  //   console.log("fuzzy searching!!!!");

  //   this.searchTriggerServ.fuzzySearch.next(this.fuzzyString);
  // }
}
