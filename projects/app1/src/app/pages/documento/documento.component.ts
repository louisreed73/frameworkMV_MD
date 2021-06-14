import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxExtendedPdfViewerService } from "ngx-extended-pdf-viewer";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-documento",
  templateUrl: "./documento.component.html",
  styleUrls: ["./documento.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoComponent implements OnInit, OnDestroy {
  @Input() documento: any;
  
  pdfSrc:string;
  pdfQuery: any;
  pageLabel: string;
  fuzzySubsc: Subscription;
  pruebas: Array<string> = [
    "summer",
    "sommerville",
    "motherFucker",
    "what",
    "shit",
  ];

  tempString: Array<string> = [];

  

  buscando: any = (() => {
    let count = 10;

    return (e) => {
      if (!e.total) {
        let total = this.tempString.length;
        let shorten = this.tempString.slice(0, Math.round(total / 2));
        this.fuzzySearching(shorten.join(""));
        this.tempString = shorten;
        console.log(`%cEl contador es:${(count += 4)}`, "color:gold");
      } else {
        console.log("Hay resultados!!!!");
      }
    };
  })();

  constructor(
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private searchTriggerServ: SearchTriggerService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.pdfSrc=this.documento.pdfSrc
    this.fuzzySubsc = this.searchTriggerServ.fuzzySearch
      .pipe(
        map((d) => {
          let clearedSpacesString = d.split(/\s/);
          return clearedSpacesString;
        })
      )
      .subscribe((d) => {
        this.tempString = d;
        this.fuzzySearching(d.join(""));
      });
  }

  // {
  //      highlightAll?: boolean;
  //      matchCase?: boolean;
  //      wholeWords?: boolean;
  //      ignoreAccents?: boolean;
  //      findMultipleSearchTexts?: boolean;
  //      fuzzySearch?: boolean;
  //  }

  pRendered(e) {
  }

  estadoBusqueda(e) {
  }

  _buscando(e) {
    if (!e.total) {
      let total = this.tempString.length;
      let shorten = this.tempString.slice(0, Math.round(total / 2));
      this.fuzzySearching(shorten.join(""));
      this.tempString = shorten;
    } else {
      console.log("Hay resultados!!!!");
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.fuzzySubsc.unsubscribe();
  }

  fuzzySearching(query: string): void {
    console.log(`%cLa frase ahora es: ${query}`, "color:lime");
    
    let findButton = this._document.querySelector(
      "#viewFind"
      ) as HTMLButtonElement;
      console.log(`%cLos elementos son: ${findButton}`, "color:lime");
    let findBar = this._document.querySelector("#findbar") as HTMLElement;
    let searchisHidden = findBar.classList.contains("hidden");

    if (!searchisHidden) {
      findButton.click();
    }
    this.ngxExtendedPdfViewerService.find(query, {
      fuzzySearch: true,
    });
  }
}
