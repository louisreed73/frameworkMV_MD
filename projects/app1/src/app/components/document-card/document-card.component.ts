import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Observable, of, pipe } from "rxjs";
import { shareReplay, switchMap, tap } from "rxjs/operators";
import { SpinnerService } from "../../services/spinner.service";

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
   * anchorTagDownloaded
   * ElementRef
   * to trigger click when api call Buscador
   * for this specific document
   *
   */
  @ViewChild("anchorTagDownload", { static: true })
  anchorTagDownloaded: ElementRef;

  /**
   *
   * pdfData$
   * Observable to subscribe and unsubscribe
   * on html template
   * receiving href array string Data
   * pdf
   *
   */
  pdfData$: Observable<string>;

  /**
   *
   * onInicio
   * boolean switch
   * to call api Buscador only
   * in the first click
   *
   */
  onInicio: boolean = true;
  /**
   *
   * Constructor, initializes Component
   *
   */
  constructor(
    private router: Router,
    private http: HttpClient,
    private spinner: SpinnerService
  ) {}

  /**
   *
   * Method to navigate to documento specific
   * document id, rendering pdf data
   * an other information
   * @param e {Event}
   * @returns void
   */
  selectedDocument(e) {
    console.log(this.documento.id_documento);
    this.router.navigate(["/documento/", this.documento.id_documento || 1]);
  }

  /**
   *
   * Method to to download the
   * pdf data array
   * api Buscador call
   * set href template array data
   * preventDefault click on first call
   * and clicked programmatically
   * when received data
   * @param e {Event}
   * @returns void
   */
  onDownloadDoc(e: Event) {
    //show Spinner as user information
    this.spinner.requestSpinner$.next(true);
    let urlDownload = `${environment.app.baseURLApiBuscadorDetailDocument}${
      this.documento.id_documento || "H_18050813145J04N32J_0339_18_DPA"
    }?tipo_param=contenido`;

    if (this.onInicio) {
      e.preventDefault();

      // Observable to receive array data string pdf
      this.pdfData$ = this.http.get(urlDownload).pipe(
        tap(console.log),
        switchMap((d) => {
          let dataPDF = "data:application/pdf;base64,";
          dataPDF += d.data.pdf;

          this.onInicio = !this.onInicio;
          setTimeout(() => {
            // actual click that download the file
            this.anchorTagDownloaded.nativeElement.click();
            //hide Spinner, we have already the data
            this.spinner.requestSpinner$.next(false);
          }, 0);
          return of(dataPDF);
        })
      );
    }
    // console.log(this.anchorTagDownloaded);
  }
}
