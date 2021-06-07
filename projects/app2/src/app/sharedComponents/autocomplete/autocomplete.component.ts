import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  autocompleteFormG: FormGroup = new FormGroup({});
  @Input() sugerenciasData: Array<string>;
  @Input() autocompleteInstance: number;
  @Output('sugerenciasOut')
  sugerenciasEmit: EventEmitter<Object> = new EventEmitter<Object>();
  sugerencias: Array<string>;
  autoCompleteInputEvSub: Subscription;

  set nuevo(v) {
    console.log(`%cEl nuevo valor es:${v}`,"color:gold");

    if (v === '') {
      console.log(`Hay un cambio del input: ${v}`,"color:pink")
      this.sugerencias = [];
      return
    }
    this.sugerencias = this.sugerenciasData.filter((value) => {
      // console.log("estoy filtrando", ciudad)
      // return ciudad.search(new RegExp(`${data}`, 'gi')) !== -1;
      return value.search(new RegExp(`${v}`, 'gi')) !== -1;
    })

    
  }

  // get sugerenciasdar () {
  //   console.log("dando sugerencias!")
  //   return this.sugerencias
  // }
  constructor() {
    
  }

  ngOnInit(): void {
    this.autocompleteFormG.addControl(
      'autocomplete' + this.autocompleteInstance,
      new FormControl('')
    );
    this.autoCompleteInputEvSub = this.autocompleteFormG
      .get('autocomplete' + this.autocompleteInstance)
      .valueChanges
      .pipe(
        debounceTime(100),
        // startWith("")
        )
      .subscribe((data) => {
        // console.log(data)
        // console.log(this.sugerenciasData)
        
        this.sugerencias = this.sugerenciasData.filter((value) => {
          console.log("estoy filtrando", value)
          // return value.search(new RegExp(`${data}`, 'gi')) !== -1;
          return value.search(new RegExp(`${data}`, 'gi')) !== -1;
        });

        if (data === '') {
          // console.log(`Hay un cambio del input: ${data}`,"color:pink")
          this.sugerencias = [];
          // return
        }
        // console.log(this.sugerencias)

      });
  }

  ngOnDestroy(): void {
    this.autoCompleteInputEvSub.unsubscribe();
  }

  getSugerencia(i: number) {
    let selectedTipo = this.sugerencias[i];

    this.sugerenciasEmit.emit({
      selectedTipo,
      instancia: this.autocompleteInstance,
    });
  }
}

