import { Location } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/**
 *
 * DetailLayoutComponent
 * Main Layout of detail document
 * it receives from parent user
 * specific document selection
 * document
 * from API Buscador
 * and send this information
 * to child Components
 * sideBar left Section of info
 * and main right section
 * render pdf viewer
 *
 *
 */
@Component({
  selector: "app-detail-layout",
  templateUrl: "./detail-layout.component.html",
  styleUrls: ["./detail-layout.component.scss"],
})
export class DetailLayoutComponent implements OnInit, OnDestroy {
  /**
   *
   * documento
   * Object - specific document
   * detail document object from resolver
   * (data - document-resolver.service)
   * http call api buscador
   *
   */
  documento: any;

  //

  /**
   *
   * _isShowSideBar
   * variable toggle
   * enabled/disabled margin
   * left (ng-class - m-l30)
   *
   */
  _isShowSideBar: boolean = true;

  /**
   * Constructor Initializes Component
   *
   */
  constructor(
    private location: Location,
    @Inject(Window) private window: Window,
    private route: ActivatedRoute
  ) {}

  /**
   *
   * Angular Hook
   * On Init of this component logic
   *
   */
  ngOnInit() {
    // getting documento detail from resolver
    this.documento = this.route.snapshot.data.documento;
    // apply body overflow hidden style
    this.window.document.body.style.overflow = "hidden";
  }

  /**
   *
   * volver
   * Method to route user back
   * to last Searching Tab
   * Documentos - Escritos - Resoluciones
   *
   */
  volver() {
    this.location.back();
  }

  /**
   *
   * isShowSideBar
   * Method
   * We toggle _isShowSideBar boolean variable true-false
   * if true we add m-l30 class to main tag Element
   * -margin-left 30rem-
   * otherwise we remove this class
   *
   */
  isShowSideBar() {
    // enabled/disabled main html tag class m-l30
    this._isShowSideBar = !this._isShowSideBar;
  }

  /**
   *
   * Angular Hook
   * On Destroy of this component logic
   * We applied default or auto overflow style rule
   * to body
   *
   */
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    // apply body overflow auto style / reset out of this detail document page

    this.window.document.body.style.overflow = "auto";
  }
}
