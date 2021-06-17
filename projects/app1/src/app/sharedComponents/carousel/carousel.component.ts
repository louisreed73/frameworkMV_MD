import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { SearchTriggerService } from "../../services/search-trigger.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {
  @Input('coincidenciasArray') itemsArray:Array<string>;

  isDragging: boolean;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
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

  clickSnippet(item: string) {
    if (!this.isDragging) {
      console.log(
        `%cEste es el Snippet: ${item}`,
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
