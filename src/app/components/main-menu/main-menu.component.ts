import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppService } from '@mova/components/core';
import { HeaderAction1 } from '../header-action-1/header-action-1.component';
import { HeaderAction2 } from '../header-action-2/header-action-2.component';
import { HeaderAction3 } from '../header-action-3/header-action-3.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss']
})
export class MainMenu implements OnInit {

  // Evento principal de MOVA para configurar el tree-filter del menú lateral
  @Output() movaSetMainFrameConfig: EventEmitter<any> = new EventEmitter();

  constructor(
    private _appService: AppService
  ) { }

  ngOnInit() {


    /***********************************************
     * Configuración del header y del menú lateral *
     ***********************************************/

    // Configuración de la cabecera
    let headerConfig = {
      "showBackButton": false,
      "actionComponents": {
        "component001": HeaderAction1,
        "component002": HeaderAction2,
        "component003": HeaderAction3
      }
    }



    // Cargar el menú lateral con los datos que queremos.
    let headerAndlateralMenuConfigs = {
      "headerConfig": headerConfig
    }

    this.movaSetMainFrameConfig.emit(headerAndlateralMenuConfigs);
  }

  ngAfterViewInit() {


  }

  ngOnDestroy() {

  }

}
