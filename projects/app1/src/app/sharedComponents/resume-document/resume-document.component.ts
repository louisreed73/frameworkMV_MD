import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { DocumentoMetadata } from "../../interfaces/documento-metadata";

/**
 *
 * ResumeDocumentComponent
 * This component receive metadata from
 * API buscador documento (detail)
 * in order to render info in sideBar left
 * bytes Array data pdf to download pdf
 * and snippets array for fuzzy Searching
 * rendered as a carousel of strings.
 *
 *
 */
@Component({
  selector: "app-resume-document",
  templateUrl: "./resume-document.component.html",
  styleUrls: ["./resume-document.component.scss"],
})
export class ResumeDocumentComponent implements OnInit {
  /**
   *
   * documento data
   * as an array of 2 objects:
   * [0] ---> metadatos (document info)
   * [1] ---> contenido (pdf documento data)
   *
   */
  @Input() documento: any;
  // fuzzyString: string;

  /**
   *
   * Storing Name of downloaded document
   * as ID of this specific documento
   *
   */
  pdfDownload_Name: string;

  /**
   *
   * Storing Bytes Array
   * from documento contenido
   * we prefix this data with
   * "data:application/pdf;base64,"
   * in order to make run download link
   * href property
   *
   */
  pdfDownload_Src: string = "";

  /**
   *
   * ID retrieved from
   * URL
   * necessary to render in sideBar left
   * info
   * //? todo change implementation od retrieving id
   * //?from url, probably using regex
   *
   */
  currentID: number;

  /**
   *
   * Storing metadatos from documento
   * info about this specific document
   *
   */
  documentoData: DocumentoMetadata;

  /**
   *
   * Storing snippets from documento
   * data necessary to implement
   * fuzzy searching in documento detail
   * right section pdf viewer
   *
   */
  coincidencias: Array<string>;

  /**
   * Constructor Initializes Component
   *
   */
  constructor(
    // private searchTriggerServ: SearchTriggerService,
    private route: ActivatedRoute
  ) {}

  /**
   *
   * Angular Hook
   * On Init of this component logic
   * Basically storing info to use
   * in template
   *
   */
  ngOnInit() {
    // this.currentID =
    //   +this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    this.currentID = this.documento[2];
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
    console.log(this.documento);
    this.documentoData = this.documento[0].data;
    console.log(this.documentoData.data);
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
