import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

/**
 *
 * FijarDirective
 * Responsible for
 * funcionality of fixed position
 * of elements when scroll top
 * position is more than
 * offset variable
 */
@Directive({
  selector: "[appFijar]",
})
export class FijarDirective implements OnInit, OnDestroy {
  /**
   *
   * Observable from
   * scroll Event Subscription
   *
   */
  windowSub: Subscription;

  /**
   *
   * offset variable for Directive
   * input
   *
   */
  @Input() offset: string;

  /**
   *
   * Constructor,
   * initializes Component
   * @param elRef { host } injection of ElementRef
   * @param render { Directive } injection of ElementRef
   * @param window { Global Object Window } injection of Window
   *
   */
  constructor(
    private elRef: ElementRef,
    private render: Renderer2,
    @Inject(Window) private window: Window
  ) {}

  /**
   *
   * Angular Hook
   * Logic needed for On Init
   * @returns {void}
   */
  ngOnInit(): void {
    // if top scroll position is more than
    // this directive offset input property
    // then add fixed position

    // apply in init
    if (this.window.pageYOffset >= +this.offset) {
      this.render.setAttribute(this.elRef.nativeElement, "class", "fijo");
    }

    // apply in scroll event
    this.windowSub = fromEvent(this.window, "scroll")
      .pipe(debounceTime(10))
      .subscribe((e: Event) => {
        let offSet = this.window.pageYOffset;
        if (offSet >= +this.offset) {
          this.render.setAttribute(this.elRef.nativeElement, "class", "fijo");
        } else {
          this.render.removeAttribute(this.elRef.nativeElement, "class");
        }
      });
  }

  /**
   *
   * Angular Hook
   * Logic needed for On Destroy
   * unsubscribe from event scroll Observable
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.windowSub.unsubscribe();
  }
}
