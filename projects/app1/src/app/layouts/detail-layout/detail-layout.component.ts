import { Location } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail-layout",
  templateUrl: "./detail-layout.component.html",
  styleUrls: ["./detail-layout.component.scss"],
})
export class DetailLayoutComponent implements OnInit, OnDestroy {
  // detail document object from resolver (data - document-resolver.service) http call api buscador
  documento: any;

  // variable toggle enabled/disabled margin left (ng-class - m-l30)
  _isShowSideBar: boolean = true;

  constructor(
    private location: Location,
    @Inject(Window) private window: Window,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // getting documento detail from resolver
    this.documento = this.route.snapshot.data.documento;
    // apply body overflow hidden style
    this.window.document.body.style.overflow = "hidden";
  }

  volver() {
    this.location.back();
  }

  isShowSideBar() {
    // enabled/disabled main html tag class m-l30
    this._isShowSideBar = !this._isShowSideBar;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    // apply body overflow auto style / reset out of this detail document page

    this.window.document.body.style.overflow = "auto";
  }
}
