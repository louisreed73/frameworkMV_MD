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

    if (v === '') {
      this.sugerencias = [];
      return
    }
    this.sugerencias = this.sugerenciasData.filter((value) => {
      // return ciudad.search(new RegExp(`${data}`, 'gi')) !== -1;
      return value.search(new RegExp(`${v}`, 'gi')) !== -1;
    })

    
  }

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
        )
      .subscribe((data) => {

        
        this.sugerencias = this.sugerenciasData.filter((value) => {
          return value.search(new RegExp(`${data}`, 'gi')) !== -1;
        });

        if (data === '') {
          this.sugerencias = [];
        }

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

