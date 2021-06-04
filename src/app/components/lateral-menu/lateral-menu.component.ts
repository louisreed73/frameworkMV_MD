import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@mova/components/core';
import { AuthenticationService } from '@mova/components/core'
import { MvButtonLogin } from '@mova/components/button-login/';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lateral-menu',
  templateUrl: './lateral-menu.html',
  styleUrls: ['./lateral-menu.scss']
})
export class LateralMenu implements OnInit {

  @ViewChild(MvButtonLogin, {static: false}) hiddenButtonLogin: MvButtonLogin;
  @ViewChild(MvButtonLogin, {static: false}) hiddenButtonLogout: MvButtonLogin;

  // Variable con el estado del login
  isLogged: boolean;
  // Subscripción al método showContentLoading del servicio App de MOVA
  subscriptionUpdateLoggedStatus: Subscription;
  // Nombre del usuario que se ha logado
  username: String;

  /*
  Elementos del tree-filter del usuario
  */
  treeFilterElementsMenuUser = [
    {
      "iconTitle": "fa-cog",
      "iconTitleFontSet": "fas",
      "title" : "Perfil",
      "subtitle": "",
      "css" : "level0 item",
      "link": {
        "type": "state",
        "uri": "user-view"
      }
    },
    {
      "iconTitle": "fa-times",
      "iconTitleFontSet": "fas",
      "title": "Desconectar",
      "subtitle": "",
      "css" : "level0 item logout-option",
      "link": {}
    }
  ]

  /*
  Elementos del tree-filter de contenidos
  */
  treeFilterElementsMenu = [
    {
      "iconTitle": "fa-home",
      "iconTitleFontSet": "fa",
      "iconTitleColor": "secondary-001",
      "title" : "Inicio",
      "subtitle": "",
      "css" : "level0 item",
      "link": {
        "type": "state",
        "uri": "main-menu"
      }
    }
  ]

  constructor(
    private _appService: AppService,
    private _authenticationService: AuthenticationService
  ) {

    // Reaccionar cuando el estado de login cambie
    this.subscriptionUpdateLoggedStatus = this._authenticationService.updateLoggedStatus$.subscribe(

      (data: any) => {
        this.isLogged = data;

        this.updateDataOnIsLoggedChange();
      }
    );
  }

  ngOnInit() {

    // Estado de login inicial
    this.isLogged = this._authenticationService.isLogged();

    this.updateDataOnIsLoggedChange();
  }

  // Evento lanzado al seleccionar un elemento del menú lateral
  onSelectItem(item: any) {

    // Ocultar el menú lateral al hacer click en una opción que no sea un elemento padre
    if (item.children.length == 0) {

      if (item.css.indexOf('logout-option') > -1) { // La opción de desconexión no cierra el menú

        this.hiddenButtonLogout.clickNative();

      } else {

        this._appService.closeLateralMenu();
      }
    }
  }

  // Centraliza los cambios cuando se produce un cambio en el estado de login
  updateDataOnIsLoggedChange() {
    if (this.isLogged) {
      let globalCredentials = this._authenticationService.getCredentials();
      if (globalCredentials && globalCredentials.user) this.username = globalCredentials.userName;
    }
  }

  // Lanza el proceso de login
  doLogin() {

    this.hiddenButtonLogin.clickNative();
  }

  // Lanza el proceso de logout
  doLogout() {

    this.hiddenButtonLogout.clickNative();
  }
}
