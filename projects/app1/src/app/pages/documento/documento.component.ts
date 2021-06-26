import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
import { NgxExtendedPdfViewerService } from "ngx-extended-pdf-viewer";
// import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

/**
 *
 * DocumentoComponent
 * this component implements
 * render pdf through
 * ngx-extended-pdf-viewer
 * it receives documento array bytes
 * and also run fuzzySearch
 *
 */
@Component({
  selector: "app-documento",
  templateUrl: "./documento.component.html",
  styleUrls: ["./documento.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoComponent implements OnInit, OnDestroy {
  /**
   *
   * documento
   * receiving documento detail object
   *
   */
  @Input() documento: any;

  /**
   *
   * pdfSrc
   * Store pdfSrc as base64 on init
   * from documento object
   *
   */
  pdfSrc: string;

  // Todo remove this
  // pdfQuery: any;
  // pageLabel: string;

  /**
   *
   * fuzzySubsc
   * Storing fuzzySearch Subscription
   * when click - Subject sending button
   * fuzzy in resume-document.component
   *
   */
  fuzzySubsc: Subscription;

  // tempString: Array<string> = [];

  // Todo remove this
  // buscando: any = (() => {
  //   let count = 10;

  //   return (e) => {
  //     if (!e.total) {
  //       let total = this.tempString.length;
  //       let shorten = this.tempString.slice(0, Math.round(total / 2));
  //       this.fuzzySearching(shorten.join(""));
  //       this.tempString = shorten;
  //       console.log(`%cEl contador es:${(count += 4)}`, "color:gold");
  //     } else {
  //       // console.log("Hay resultados!!!!");
  //     }
  //   };
  // })();

  /**
   * Constructor Initializes Component
   */
  constructor(
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private searchTriggerServ: SearchTriggerService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  /**
   *
   * Angular Hook
   * On Init of this component logic
   * We subscribe to fuzzySearch
   * Subject and when broadcast
   * we run fuzzy Searching
   *
   */
  ngOnInit() {
    // Storing array bytes base64 pdf data
    this.pdfSrc = this.documento.data.pdf;
    // Removing spaces in string received for fuzzy Search and calling fuzzySearching method
    this.fuzzySubsc = this.searchTriggerServ.fuzzySearch
      .pipe(
        map((d) => {
          let clearedSpacesString = d.split(/\s/);
          return clearedSpacesString;
        })
      )
      .subscribe((d) => {
        // this.tempString = d;
        this.fuzzySearching(d.join(""));
      });
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * unsubscribing from fuzzSearch
   * subscription
   *
   */
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.fuzzySubsc.unsubscribe();
  }

  /**
   *
   * fuzzySearching
   * Method
   * Actual fuzzySearch implementation
   * with ngx-extended-pdf-viewer
   * find method
   * we cached button of ngx-extended-pdf-viewer
   * #viewFind to trigger click
   *
   */
  fuzzySearching(query: string): void {
    console.log(`%cLa frase ahora es: ${query}`, "color:lime");

    // elements to findout if extended pdf viewer search is open with all options
    let findButton = this._document.querySelector(
      "#viewFind"
    ) as HTMLButtonElement;
    let findBar = this._document.querySelector("#findbar") as HTMLElement;
    let searchisHidden = findBar.classList.contains("hidden");

    // when trigger click button fuzzy in resume-document.component we open menu in pdf viewer fuzzySearch mode
    if (searchisHidden) {
      findButton.click();
    }

    // Actual extended pdf viewer service find with options, in this case fuzzySearch
    //options for this service:
    //? {
    // ?     highlightAll?: boolean;
    //  ?    matchCase?: boolean;
    //  ?    wholeWords?: boolean;
    //  ?    ignoreAccents?: boolean;
    //  ?    findMultipleSearchTexts?: boolean;
    //  ?   fuzzySearch?: boolean;
    //?  }
    this.ngxExtendedPdfViewerService.find(query, {
      fuzzySearch: true,
    });
  }
}
