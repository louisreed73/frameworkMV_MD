// import { DatePipe, formatDate, Location } from "@angular/common";
import {
  // AfterViewInit,
  Component,
  ElementRef,
  // Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  // ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
// import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { FiltrosService } from "projects/app1/src/app/services/filtros.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";

/**
 *
 * FiltroComponent
 * Core Coponent
 * includes a lot of utilities
 * related with Filters:
 */
@Component({
  selector: "app-filtro",
  templateUrl: "./filtro.component.html",
  styleUrls: ["./filtro.component.scss"],
})
export class FiltroComponent implements OnInit, OnDestroy {
  /**
   *
   * filtros Data
   * Receive both
   * the configuration
   * and FormGroup data
   * to build Filters
   * uses Observable from http
   * call API catalogos
   */
  @Input() filtros;

  /**
   *
   * Querylist of ElementRef
   * for Each Filter
   * it traverses the
   * DOM tree
   * It's viewed from Parent Component
   * of filtro Components
   * to run collapse/uncollapse Filters
   *
   */
  @ViewChildren("toggleEl")
  toggles: QueryList<ElementRef>;

  /**
   *
   * Used to get
   * the configuration object
   * of each specific filter
   * inside of Template
   *
   */
  configFiltro;

  /**
   *
   * Used to get
   * the controls
   * of each specific filter
   * inside of Template
   *
   */
  filtroFormGroup: FormGroup;

  /**
   *
   * String to Store
   * info about Filter context
   * Documentos / Escritos / Resoluciones
   *
   */
  clase: string;

  /**
   *
   * Aarray Data
   * It's used to
   * Store ArrayForm Controls
   * from Filters of tipo Array
   * in case is alredy included
   * is not included otherwise
   * is not pushed into the array
   *
   */
  indice = [];

  /**
   * Subscription from
   * Value Changes Observable
   * of FiltroFormGroup
   *
   */
  filtrosArrayFormsSubs: Subscription;

  /**
   *
   * Subjet
   * It's used to trigger
   * collapsed and received
   * in another component
   * to implement collapse
   * uncollapse Filters
   *
   */
  triggerCollapse: Subject<any> = new Subject();

  /**
   *
   * On launching new Search
   * we set the page Number to 1
   *
   */
  pagina: number = 1;

  /**
   *
   * Observable of type
   * boolean
   * Inside of template
   * to allow container view
   * when filters are received
   * it relates to API call
   * Catalogos
   *
   */
  show$: any;

  /**
   *
   * param: filtrosServ {Filtros Service} required to reflect Filters changes
   * param: searchTrigger {SearchTrigger Service } necessary
   * to trigger new Search and it's associated info:
   * Filter Updated and Page.
   */
  constructor(
    // private combinacion: DocumentosService,
    // @Inject(Window) private window: Window,
    private filtrosServ: FiltrosService,
    private searchTrigger: SearchTriggerService // public datepipe: DatePipe
  ) {}

  /**
   *
   * getter - it's used in template
   * to get about each filter Controls
   *
   */
  get keys() {
    return Object.keys(this.filtroFormGroup.controls);
  }

  /**
   *
   * it's used in template
   * to render zeros in procedimiento nº Filter
   * Placeholder
   *
   */
  placeHold(inputI: number) {
    return inputI ? "0000" : "000";
  }

  /**
   *
   * it's used in template
   * to get Values from configuration
   * Object of each filter
   *
   */
  getValuesFromRadios(ind: number) {
    return this.configFiltro[ind].values;
  }

  /**
   *
   * it's used in template
   * to get Controls of each
   * Filter of tipo Array
   *
   */
  dameformGroupArray(i) {
    return (<FormArray>this.filtroFormGroup.get(`arrayData${i}`)).controls;
  }

  /**
   *
   * it's used in template
   * to get Names of each Filter
   * Controls
   *
   */
  dameControlsKeys(item) {
    return Object.keys(item.controls);
  }

  /**
   *
   * Utility function
   * It's used in the template
   * to get tipo
   * and logic in the template
   * for each filter
   *
   */
  dameTipo(prop) {
    let tipo;
    if (this.filtroFormGroup.get(prop) instanceof FormArray) {
      tipo = "FormArray";
    }
    if (this.filtroFormGroup.get(prop) instanceof FormGroup) {
      tipo = "FormGroup";
    }
    if (this.filtroFormGroup.get(prop) instanceof FormControl) {
      tipo = "FormControl";
    }
    return tipo;
  }

  /**
   *
   * Angular Hook
   * On Init of this component logic
   * It's used to initialize values
   * and data for the Template
   * and return Observable valueChanges
   * in each filter to trigger new Search
   * and map Data of filter
   * to make a call to API Buscador
   * @return void
   *
   */
  ngOnInit(): void {
    this.show$ = this.filtrosServ.showFilters$;
    this.configFiltro = this.filtros.data[0];
    this.filtroFormGroup = this.filtros.data[1];
    this.clase = this.filtros.clase;

    this.filtrosArrayFormsSubs = this.filtroFormGroup.valueChanges
      .pipe(debounceTime(300))
      .subscribe((data) => {
        let transformedData = this.mapeadoFiltro(data);
        this.triggerNewSearch(transformedData);
      });
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * It's used to unsubscribe from Subscription
   * created to return value Changes Observable
   * of this filter
   * @return void
   *
   */
  ngOnDestroy(): void {
    this.filtrosArrayFormsSubs.unsubscribe();
  }

  /**
   *
   * Function to include new sugerencia
   * or not in filter of tipo Array
   * depending if is already included
   * for the Template
   *
   */
  anadeForma = (() => {
    return (arrayData: string, nombrado: string) => {
      if (this.indice.includes(nombrado)) {
        return;
      }

      this.indice.push(nombrado);

      (<FormArray>this.filtroFormGroup.get(arrayData)).push(
        new FormGroup({
          [`${nombrado}`]: new FormControl(true),
        })
      );
    };
  })();

  /**
   *
   * Function to remove each
   * sugerencia of filter tipo Array
   * for the Template
   *
   */
  eliminaControl(keyArray, i) {
    let key = Object.keys(
      <FormArray>this.filtroFormGroup.get(keyArray).value[i]
    )[0];
    let numberIndice = this.indice.indexOf(key);
    this.indice.splice(numberIndice, 1);
    (<FormArray>this.filtroFormGroup.get(keyArray)).removeAt(i);
  }

  /**
   *
   * Function to clean filter
   * of tipo Array sugerencias when using
   * cleanFilters method
   * it reset sugerencias data Array into
   * void Array
   * for the Template
   *
   */
  eliminaTodo(keyArray) {
    let numberLength = (<FormArray>this.filtroFormGroup.get(keyArray)).length;

    for (let index = numberLength - 1; index > -1; index--) {
      (<FormArray>this.filtroFormGroup.get(keyArray)).removeAt(index);
    }
    this.indice = [];
  }

  /**
   *
   * Function to add another
   * sugerencia when clicked in sugerencias
   * container trigger by user input event
   * for the Template
   *
   */
  getSugerencia(e: { [k: string]: any }) {
    this.anadeForma("arrayData" + e.instancia, e.selectedTipo);
  }

  /**
   *
   * Function to updated All
   * Filters observed and trigger new
   * Search with info about page
   *
   */
  triggerNewSearch(data) {
    //! TO Clean possible not necessary
    // this.combinacion.stopScroll$.next(true);

    let actual = this.searchTrigger.updatedFiltro;

    let updatedChangesFiltro;

    switch (this.filtros.clase) {
      case "documentos":
        {
          updatedChangesFiltro = {
            ...actual,
            documentos: data,
          };
        }
        break;
      case "resoluciones":
        {
          updatedChangesFiltro = {
            ...actual,
            resoluciones: data,
          };
        }
        break;
      case "escritos":
        {
          updatedChangesFiltro = {
            ...actual,
            escritos: data,
          };
        }
        break;
    }

    this.searchTrigger.updatedFiltro = updatedChangesFiltro;
    this.searchTrigger.updatedPaginaDocumentos = this.pagina;
  }

  /**
   *
   * Function to check if this
   * Filter is edited already if so we active
   * dot indication of filter Edited otherwise
   * we set dot to Off
   * for the Template
   *
   */
  whatIs(obj) {
    return Object.values(this.filtroFormGroup.controls[obj].value).some(
      (val) => !!val
    );
  }

  /**
   *
   * Function to broadcast
   * and trigger
   * activation of utility of collapse
   * uncollapse this Filter specifically
   * for the Template
   *
   */
  filtroParent() {
    this.triggerCollapse.next(null);
  }

  /**
   *
   *
   *
   * Function to map each
   * Filter - it's very important!
   * it complies with API buscador
   * requirements of model of Filters
   * data
   * in order to make an http call
   *
   * This also convert date formats
   * to Spanish Version and
   * split some objects into properties
   */
  mapeadoFiltro(data) {
    let transformedData = {};
    let indice = 0;
    for (let value of Object.values(data)) {
      if (Array.isArray(value)) {
        let tempAutocomplete = [];
        value.forEach((val) => {
          tempAutocomplete.push(Object.keys(val)[0]);
        });
        transformedData[this.configFiltro[indice].name] = tempAutocomplete;
        indice++;
      } else {
        if (this.configFiltro[indice].name === "tipo resolucion") {
          let filtrotipoResoluciones = Object.keys(value).filter(
            (k) => value[k]
          );
          transformedData[this.configFiltro[indice].name] =
            filtrotipoResoluciones;
          indice++;
        } else {
          if (this.configFiltro[indice].tipo === "date") {
            let props = Object.keys(value);
            let newObject = {};

            props.forEach((prop) => {
              let propSplit =
                (value as { [k: string]: string }) &&
                (value as { [k: string]: string })[prop] !== null
                  ? (value as { [k: string]: string })[prop].split("-")
                  : "";

              newObject[prop] =
                propSplit[0] && propSplit[1] && propSplit[2]
                  ? propSplit[2] + "-" + propSplit[1] + "-" + propSplit[0]
                  : "";
            });

            console.log(newObject);

            transformedData[this.configFiltro[indice].name] = newObject;
          } else {
            transformedData[this.configFiltro[indice].name] = value;
          }
          indice++;
        }
      }
    }

    let newTransformedData = {
      ...transformedData,
      "nProcedimiento": transformedData["procedimiento nº / año"]["numero"],
      "anyo_procedimiento": transformedData["procedimiento nº / año"]["año"],
    };
    console.log(newTransformedData);
    delete newTransformedData["procedimiento nº / año"];

    return newTransformedData;
  }
}
