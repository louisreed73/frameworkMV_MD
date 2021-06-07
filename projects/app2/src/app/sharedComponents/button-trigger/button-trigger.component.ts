import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { fromEvent, merge } from "rxjs";
import { tap } from "rxjs/operators";
import { SearchTriggerService } from "projects/app2/src/app/services/search-trigger.service";

@Component({
  selector: "app-button-trigger",
  templateUrl: "./button-trigger.component.html",
  styleUrls: ["./button-trigger.component.scss"],
})
export class ButtonTriggerComponent implements OnInit, AfterViewInit {
  @ViewChild("searchTrigger", { static: true }) button: ElementRef;

  constructor(
    @Inject(Window) private window: Window,
    private searchTrigger: SearchTriggerService,
    private location: Location
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    merge(
      fromEvent(window.document, "keyup"),
      fromEvent(this.button.nativeElement, "click")
    )
      .pipe
      //  tap(console.log)
      ()
      .subscribe((event: Event) => {
        let routePath = this.location.path().replace(/\//, "");
        console.log("botón pulsado!!!!", routePath);
        // console.log(event);
        if (event instanceof KeyboardEvent && event.key === "Enter") {
          //  console.log(event.key);

          this.window.scrollTo(0, 0);
          this.searchTrigger.updatedPagina = 1;
          this.searchTrigger.updatedSearch.tipo = routePath;
          this.searchTrigger.newTriggerSearch.next("busca");
        }

        if (event instanceof MouseEvent) {
          // console.log(event.type)
          this.window.scrollTo(0, 0);
          this.searchTrigger.updatedPagina = 1;
          this.searchTrigger.updatedSearch.tipo = routePath;
          this.searchTrigger.newTriggerSearch.next("busca");
        }
      });
  }
}
