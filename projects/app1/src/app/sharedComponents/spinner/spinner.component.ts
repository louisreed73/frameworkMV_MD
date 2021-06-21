import { Component, Input, OnInit } from "@angular/core";

/**
 * Spinner Component responsible for rendering
 * Spinner in http API requests
 */
@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent implements OnInit {
  /**
   * diameter {number}
   * set the Spinner radio, in pixels
   * How big Spinner is
   */
  @Input()
  diameter: number;
  /**
   * strokeWidth {number}
   * set the Spinner width of circle, in pixels
   *
   */
  @Input()
  strokeWidth: number;

  /**
   * Constructor {Hook}
   * initialies the Component, no need for some logic
   *
   */
  constructor() {}

  /**
   *
   * Angular {Hook}
   * On Init Component, no need for some logic
   *
   */
  ngOnInit() {}
}
