import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CarouselSlideDirective, OwlOptions } from "ngx-owl-carousel-o";
import { SearchTriggerService } from "../../services/search-trigger.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {
  @Input("coincidenciasArray") itemsArray: Array<string>;
  // @ViewChildren("slide")
  // slides: QueryList<ElementRef>;
  isDragging: boolean;
  indiceActivo: number;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    // navText: ["", ""],
    responsive: {
      0: {
        items: 3,
      },
      500: {
        items: 7,
      },
      740: {
        items: 8,
      },
      940: {
        items: 10,
      },
    },
    nav: false,
  };

  // itemsArray: Array<string> = [
  //   "maria",
  //   "cesar",
  //   "constituir",
  //   "representacion",
  //   "al mismo",
  //   "alvarez",
  //   "comunicacion",
  //   "intervienen",
  //   "tuyu",
  //   "a contar",
  //   "cristina de cea",
  //   "junta universal",
  // ];

  constructor(private searchTriggerServ: SearchTriggerService) {}

  ngOnInit() {}

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   console.log(`%cRevisando los slides: ${this.slides}`, "color:gold");

  //   this.slides.forEach((item) => {
  //     console.log(
  //       `%cRevisando los slides: ${item.nativeElement}`,
  //       "color:gold"
  //     );
  //   });
  // }

  clickSnippet(item: string, index: number) {
    if (!this.isDragging) {
      this.indiceActivo = index;
      console.log(
        `%cEste es el Snippet: ${item} ${index} ${this.indiceActivo}`,
        "color:lime"
      );

      this.searchTriggerServ.fuzzySearch.next(item);
    }
  }

  nowDragging(dragging: boolean) {
    setTimeout(() => {
      this.isDragging = dragging;
    }, 10);
  }
}
