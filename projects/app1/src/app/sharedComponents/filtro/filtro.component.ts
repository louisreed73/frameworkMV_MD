import { DatePipe, formatDate, Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";
import { FiltrosService } from "projects/app1/src/app/services/filtros.service";
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";

@Component({
  selector: "app-filtro",
  templateUrl: "./filtro.component.html",
  styleUrls: ["./filtro.component.scss"],
})
export class FiltroComponent implements OnInit, OnDestroy {
  @Input() filtros;
  @ViewChildren("toggleEl")
  toggles: QueryList<ElementRef>;
  configFiltro;
  filtroFormGroup: FormGroup;
  clase: string;
  indice = [];
  filtrosArrayFormsSubs: Subscription;
  triggerCollapse: Subject<any> = new Subject();
  // Pagination request increment or reset to 1
  pagina: number = 1;
  show$: any;
  constructor(
    private combinacion: DocumentosService,
    @Inject(Window) private window: Window,
    private filtrosServ: FiltrosService,
    private searchTrigger: SearchTriggerService,
    public datepipe: DatePipe
  ) {}

  get keys() {
    return Object.keys(this.filtroFormGroup.controls);
  }

  placeHold(inputI: number) {
    return inputI ? "0000" : "000";
  }

  getValuesFromRadios(ind: number) {
    return this.configFiltro[ind].values;
  }

  dameformGroupArray(i) {
    return (<FormArray>this.filtroFormGroup.get(`arrayData${i}`)).controls;
  }

  dameControlsKeys(item) {
    return Object.keys(item.controls);
  }

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

  ngOnDestroy(): void {
    this.filtrosArrayFormsSubs.unsubscribe();
  }

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

  eliminaControl(keyArray, i) {
    let key = Object.keys(
      <FormArray>this.filtroFormGroup.get(keyArray).value[i]
    )[0];
    let numberIndice = this.indice.indexOf(key);
    this.indice.splice(numberIndice, 1);
    (<FormArray>this.filtroFormGroup.get(keyArray)).removeAt(i);
  }

  eliminaTodo(keyArray) {
    let numberLength = (<FormArray>this.filtroFormGroup.get(keyArray)).length;

    for (let index = numberLength - 1; index > -1; index--) {
      (<FormArray>this.filtroFormGroup.get(keyArray)).removeAt(index);
    }
    this.indice = [];
  }

  getSugerencia(e: { [k: string]: any }) {
    this.anadeForma("arrayData" + e.instancia, e.selectedTipo);
  }

  triggerNewSearch(data) {
    this.combinacion.stopScroll$.next(true);

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

  whatIs(obj) {
    return Object.values(this.filtroFormGroup.controls[obj].value).some(
      (val) => !!val
    );
  }

  filtroParent() {
    this.triggerCollapse.next(null);
  }

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
            let desde = (value as { [k: string]: string } && (value as { [k: string]: string }).desde!==null)
              ? (value as { [k: string]: string }).desde.split("-")
              : "";
            let hasta = (value as { [k: string]: string } && (value as { [k: string]: string }).hasta!==null)
              ? (value as { [k: string]: string }).hasta.split("-")
              : "";

            console.log(desde, hasta);
            // console.log(arrayFecha);
            let NewObject = {
              desde:
                desde[0] && desde[1] && desde[2]
                  ? desde[2] + "-" + desde[1] + "-" + desde[0]
                  : "",
              hasta:
                hasta[0] && hasta[1] && hasta[2]
                  ? hasta[2] + "-" + hasta[1] + "-" + hasta[0]
                  : "",
            };
            transformedData[this.configFiltro[indice].name] = NewObject;
          } else {
            transformedData[this.configFiltro[indice].name] = value;
          }
          indice++;
        }
      }
    }

    let newTransformedData = {
      ...transformedData,
      "procedimiento nº": transformedData["procedimiento nº / año"]["numero"],
      "procedimiento año": transformedData["procedimiento nº / año"]["año"],
    };
    console.log(newTransformedData);
    delete newTransformedData["procedimiento nº / año"];

    return newTransformedData;

    // return transformedData;
  }
}
