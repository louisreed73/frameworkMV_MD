import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime, startWith } from "rxjs/operators";

/**
 *
 * AutocompleteComponent
 * Responsible for each filter type Array
 * input element get sugerencias
 * filter sugerencias array
 * and includes in final filter
 */
@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  /**
   * aqutocomplete
   * Form Group
   * for adding controlForms
   * on input event
   *
   */
  autocompleteFormG: FormGroup = new FormGroup({});

  /**
   *
   * options of filter
   * data from api Catalogos
   * for each filter
   *
   */
  @Input() sugerenciasData: Array<string>;

  /**
   *
   * Refering each
   * Autocomplete instance
   *
   */
  @Input() autocompleteInstance: number;

  /**
   *
   * Emmiter sugerenciasOut
   * for parent
   * for adding option in the
   * sugerencias array
   *
   */
  @Output("sugerenciasOut")
  sugerenciasEmit: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   *
   * sugerencias
   * Array string
   * storing filtered options -sugerencias-
   * of filter
   */
  sugerencias: Array<string>;

  /**
   *
   * Subscription for
   * input user event
   * changes in input
   * reflect filtered data
   * options or sugerencias
   *
   */
  // autoCompleteInputEvSub: Subscription;

  /**
   *
   * setter nuevo
   * ngModel reflects
   * filtered sugerencias Data
   * from API catalogos
   * on input event
   *
   */
  set nuevo(v) {
    if (v === "") {
      this.sugerencias = [];
      return;
    }
    this.sugerencias = this.sugerenciasData.filter((value) => {
      return value.search(new RegExp(`${v}`, "gi")) !== -1;
    });
  }

  /**
   *
   * Constructor,
   * initializes Component
   *
   */
  constructor() {}

  /**
   *
   * Angular Hook
   * Logic needed for On Init
   * @returns {void}
   */
  ngOnInit(): void {
    this.autocompleteFormG.addControl(
      "autocomplete" + this.autocompleteInstance,
      new FormControl("")
    );
    // this.autoCompleteInputEvSub = this.autocompleteFormG
    //   .get('autocomplete' + this.autocompleteInstance)
    //   .valueChanges
    //   .pipe(
    //     debounceTime(100),
    //     )
    //   .subscribe((data) => {

    //     this.sugerencias = this.sugerenciasData.filter((value) => {
    //       return value.search(new RegExp(`${data}`, 'gi')) !== -1;
    //     });

    //     if (data === '') {
    //       this.sugerencias = [];
    //     }

    //   });
  }

  // ngOnDestroy(): void {
  //   // this.autoCompleteInputEvSub.unsubscribe();
  // }

  
/**
 *
 * on click in sugerencia 
 * emit object with new sugerencia 
 * string
 *
 */  
  getSugerencia(i: number) {
    console.log("getSugerencia!!!")
    let selectedTipo = this.sugerencias[i];

    this.sugerenciasEmit.emit({
      selectedTipo,
      instancia: this.autocompleteInstance,
    });
  }
}
