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
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";

/**
 *
 * SearchFormComponent
 * Responsible for getting User Input
 * and trigger Searching
 */
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

  /**
   *
   * Subscription del observable valueChanges del input
   * Subc
   */
  Subc: Subscription;

  /*=====  End of Subscriptions for this component  ======*/

  /*=============================================
    =            User input references to get data            =
    =============================================*/

  /**
   *
   * form Control del input del string de búsqueda
   * searchInput
   */
  searchInput = new FormControl();

  /*=====  End of User input references to get data  ======*/

  /*=============================================
    =            class members            =
    =============================================*/

  /**
   *
   * Pagination request increment or reset to 1
   * pagina
   */

  pagina: number = 1;

  /*=====  End of class members  ======*/

  /**
   *
   * Constructor
   * Initializes Component
   * @param combinacion {Service}
   * Uses combinacion stopScroll$ Observable
   * to stop Scrolling when Searching Trigger
   *
   * @param searchTrigger {Service}
   * uses some bag properties
   * to update input query of user string
   * and set the page to 1
   *
   */
  constructor(
    private combinacion: DocumentosService,
    private searchTrigger: SearchTriggerService
  ) {}

  /**
   *
   * Angular Hook
   * On Init trigger for needed logic
   * in this case, subscribe to input changes
   */
  ngOnInit() {
    // String query for get documents based in this term
    // We subscribe to changes in string query
    this.Subc = this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((inputSearch) => {
        this.triggerNewSearch(inputSearch);
      });
  }

  /**
   *
   * Angular Hook
   * On Destroy trigger for needed logic
   * in this case, unsubscribes for input changes
   */
  ngOnDestroy(): void {
    // We unsubscribe to changes in string query
    this.Subc.unsubscribe();
  }

  /**
   *
   * Method triggerNewSearch
   * @param  inputSearch {string}
   * We passed new input User string
   * updating actual page and stopping Scrolling event
   */
  triggerNewSearch(inputSearch) {
    // Stopping the scroll trigger until http request response
    this.combinacion.stopScroll$.next(true);

    //Dentro del servicio search-trigger con los setters
    // Actualizamos en cada input change los valores de string query y página
    // No lanzamos la busqueda de documentos, solo actualizamos los valores.

    this.searchTrigger.updatedSearch = inputSearch;
    this.searchTrigger.updatedPaginaDocumentos = this.pagina;
  }
}
