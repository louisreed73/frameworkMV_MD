import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appFijar]',
})
export class FijarDirective implements OnInit, OnDestroy {
  windowSub: Subscription;
  @Input() offset:string;
  constructor(
    private elRef: ElementRef,
    private render: Renderer2,
    @Inject(Window) private window: Window
  ) {}

  ngOnInit(): void {

    if(this.window.pageYOffset>= +this.offset) {
      this.render.setAttribute(this.elRef.nativeElement, 'class', 'fijo');
    };

    this.windowSub = fromEvent(this.window, 'scroll')
      .pipe(debounceTime(10))
      .subscribe((e: Event) => {
        let offSet = this.window.pageYOffset;
        if (offSet >= +this.offset) {
          this.render.setAttribute(this.elRef.nativeElement, 'class', 'fijo');
        } else {
          this.render.removeAttribute(this.elRef.nativeElement, 'class')

        }
      });
  }

  ngOnDestroy(): void {
    this.windowSub.unsubscribe();
  }
}
