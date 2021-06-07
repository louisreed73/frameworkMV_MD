import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DocumentosService } from "projects/app2/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app2/src/app/services/search-trigger.service";

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  /*=============================================
    =            Subscriptions for this component  =
      =============================================*/

  Subc: Subscription;

  /*=====  End of Subscriptions for this component  ======*/

  /*=============================================
    =            User input references to get data            =
    =============================================*/

  //form Control del input del string de búsqueda
  searchInput = new FormControl();
  // Selections Filters to apply for the documents
  // @ViewChild(NgForm, { static: true }) formulario: NgForm;

  /*=====  End of User input references to get data  ======*/

  /*=============================================
    =            class members            =
    =============================================*/

  // Pagination request increment or reset to 1
  pagina: number = 1;

  /*=====  End of class members  ======*/

  constructor(
    private combinacion: DocumentosService,
    @Inject(Window) private window: Window,
    private searchTrigger: SearchTriggerService
  ) {}

  ngOnInit() {
    // String query for get documents based in this term
    // We subscribe to changes in string query
    this.Subc = this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((inputSearch) => {
        this.triggerNewSearch(inputSearch);
      });

    //      this.Subc = this.searchTrigger.triggerSearch
    //      .pipe(
    //           // tap(console.log)
    //           )
    //           .subscribe(()=>{
    //      // this.triggerNewSearch(this.searchInput.value)

    // })
  }

  ngOnDestroy(): void {
    // We subscribe to changes in string query
    this.Subc.unsubscribe();
  }

  triggerNewSearch(inputSearch) {
    // this.window.scrollTo(0, 0);

    // Stopping the scroll trigger until http request response
    this.combinacion.stopScroll$.next(true);
    // Communicate to subscribers change in search query string
    // this.combinacion.inputSearch$.next(inputSearch);
    // Sending page 1 - always when changed input or selections
    // Scroll is unique responsible for increment pagination
    // this.combinacion.pagina$.next(this.pagina);

    this.searchTrigger.updatedSearch = inputSearch;
    this.searchTrigger.updatedPagina = this.pagina;
  }
}
