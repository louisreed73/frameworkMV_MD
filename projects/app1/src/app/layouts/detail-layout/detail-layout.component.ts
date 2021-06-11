import { Location } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DocumentosService } from "projects/app1/src/app/services/documentos.service";

@Component({
  selector: "app-detail-layout",
  templateUrl: "./detail-layout.component.html",
  styleUrls: ["./detail-layout.component.scss"],
})
export class DetailLayoutComponent implements OnInit, OnDestroy {
  documento: any = 23;
  _isShowSideBar: boolean = true;
  elementScrollTrigger: HTMLElement = this.window.document.querySelector(
    "mat-sidenav-content"
  );

  constructor(
    private documentosServ: DocumentosService,
    private location: Location,
    @Inject(Window) private window: Window
  ) {}

  ngOnInit() {
    this.documento = this.documentosServ.selectedDocument;
    this.window.document.body.style.overflow = "hidden";
  }

  volver() {
    this.location.back();
  }

  isShowSideBar() {
    this._isShowSideBar = !this._isShowSideBar;
    console.log("Cambio SideoBar!!: ");
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.window.document.body.style.overflow = "auto";
  }
}
