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
import { SearchTriggerService } from "projects/app1/src/app/services/search-trigger.service";
import { environment } from "@environments/environment";

@Component({
  selector: "app-button-trigger",
  templateUrl: "./button-trigger.component.html",
  styleUrls: ["./button-trigger.component.scss"],
})
export class ButtonTriggerComponent implements OnInit, AfterViewInit {
  @ViewChild("searchTrigger", { static: true }) button: ElementRef;
  elementScrollTrigger: HTMLElement = this.window.document.querySelector(
    "mat-sidenav-content"
  );
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

          // this.elementScrollTrigger.scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior: environment.app.scrollBehavior,
          // });
          this.window.scrollTo({
            top: 0,
            left: 0,
            behavior: environment.app.scrollBehavior,
          });
          this.searchTrigger.updatedSearch.tipo = routePath;
          if (routePath === "documentos") {
            this.searchTrigger.updatedPaginaDocumentos = 1;
            this.searchTrigger.newTriggerSearchDocumentos.next("busca");
            // this.searchTrigger.updatedSearch.tipo = routePath;
          }
          if (routePath === "resoluciones") {
            this.searchTrigger.updatedPaginaResoluciones = 1;
            this.searchTrigger.newTriggerSearchResoluciones.next("busca");
            // this.searchTrigger.updatedSearch.tipo = routePath;
          }
          if (routePath === "escritos") {
            this.searchTrigger.updatedPaginaEscritos = 1;
            this.searchTrigger.newTriggerSearchEscritos.next("busca");
          }
        }

        if (event instanceof MouseEvent) {
          // console.log(event.type)
          // this.elementScrollTrigger.scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior: environment.app.scrollBehavior,
          // });
          this.window.scrollTo({
            top: 0,
            left: 0,
            behavior: environment.app.scrollBehavior,
          });
          this.searchTrigger.updatedSearch.tipo = routePath;
          if (routePath === "documentos") {
            this.searchTrigger.updatedPaginaDocumentos = 1;
            this.searchTrigger.newTriggerSearchDocumentos.next("busca");
            // this.searchTrigger.updatedSearch.tipo = routePath;
          }
          if (routePath === "resoluciones") {
            this.searchTrigger.updatedPaginaResoluciones = 1;
            this.searchTrigger.newTriggerSearchResoluciones.next("busca");
            // this.searchTrigger.updatedSearch.tipo = routePath;
          }
          if (routePath === "escritos") {
            this.searchTrigger.updatedPaginaEscritos = 1;
            this.searchTrigger.newTriggerSearchEscritos.next("busca");
          }
        }
      });
  }
}
