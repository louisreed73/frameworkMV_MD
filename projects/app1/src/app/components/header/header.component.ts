import { Component, OnInit } from "@angular/core";

/**
 *
 * HeaderComponent
 * Responsible for rendering Header
 * in Case of prototype
 * Now is disabled
 */
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
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
