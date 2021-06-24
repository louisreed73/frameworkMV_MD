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


/**
 *
 * CarouselComponent
 * implements ngx-owl-carousel-o
 * library to display a
 * carousel of snippets
 *
 */
@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {

  
  /**
   *
   * itemsArray
   * data passed from parent component
   * items as slides to display
   * in Carousel
   *
   */  
  @Input("coincidenciasArray") itemsArray: Array<string>;
  // @ViewChildren("slide")
  // slides: QueryList<ElementRef>;

  
  /**
   *
   * Boolean reflecting
   * if user is dragging
   * in Carousel
   *
   */  
  isDragging: boolean;

  
  /**
   *
   * number reflecting
   * actual snippet selected
   * to search in pdf
   *
   */  
  indiceActivo: number;

  
  /**
   *
   * Configuration object
   * with options for the
   * library owl-carousel
   *
   */  
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

  
  /**
   *
   * Constructor,
   * initializes Component
   * @param searchTriggerServ {SearchTriggerService} Service it's used as a
   * trigger for fuzzy Search in pdf viewer
   *
   */
  constructor(private searchTriggerServ: SearchTriggerService) {}

  /**
 *
 * Angular Hook
 * Logic needed for On Init
 * @returns {void}
 */
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

  
  /**
   *
   * Function to set as active
   * when user clicked a Slide
   *
   */  
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

  
  /**
   *
   * Function to prevent
   * trigger click when
   * user is dragging
   *
   */  
  nowDragging(dragging: boolean) {
    setTimeout(() => {
      this.isDragging = dragging;
    }, 10);
  }
}
