import { Component, OnInit } from "@angular/core";

/**
 *
 * CollapsibleComponent
 *
 * Component wrapper for several
 * cases, such as
 * clean filters, collapse/uncollapse filters
 * an reveal/hide filters.
 *
 */
@Component({
  selector: "app-collapsible",
  templateUrl: "./collapsible.component.html",
  styleUrls: ["./collapsible.component.scss"],
})
export class CollapsibleComponent implements OnInit {
  /**
   *
   * Constructor,
   * initializes Component
   *
   */
  constructor() {}

  /**
   *
   * Angular Hook
   * Logic needed for On Init
   * @returns {void}
   */
  ngOnInit() {}
}
