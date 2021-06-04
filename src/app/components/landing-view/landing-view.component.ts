import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@mova/components/core';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.html',
  styleUrls: ['./landing-view.scss']
})
export class LandingView implements OnInit {

  // Evento principal de MOVA para configurar el tree-filter del menú lateral
  @Output() movaSetMainFrameConfig: EventEmitter<any> = new EventEmitter();

  // Version de la app
  appVersion: string;
  // Mostrar el fondo
  showBackground: boolean;
  // Titulo de las condiciones de acceso del login
  titleAccessConditions: string = '';
  // Texto de las condiciones de acceso del login
  textAccessConditions: string = '';
  // Ancho de las condiciones de acceso del login
  widthAccessConditions: string = '';
  private _config: any;
  private _configEnvironment: any;

  constructor(
    private _appService: AppService,
    private _router: Router
  ) { }

  ngOnInit() {
    // Recuperar la configuración de la App
    this._config = this._appService.getConfig();
    // Recuperar la configuración de entorno
    this._configEnvironment = this._appService.getConfigEnvironment();

    this.appVersion = this._config['mova']['appVersion'];
    this.titleAccessConditions = this._config['mova']['titleAccessConditions'];
    this.textAccessConditions = this._config['mova']['textAccessConditions'];
    this.widthAccessConditions = this._config['mova']['widthAccessConditions'];

    let headerConfig = {
      "showHeader": false,
      "showLateralMenu": false
    }
    let headerAndlateralMenuConfigs = {
      "headerConfig": headerConfig
    }
    this.movaSetMainFrameConfig.emit(headerAndlateralMenuConfigs);
  }

  ngAfterViewInit(): void {
    this.showBackground = true;
  }

  openUrlOnExternalbrowserClick(url){
    switch (url) {
      case 'urlContacta':
        window.open(this._config['mova']['urlContact'], '_blank');
        break;
      case 'urlAvisoLegal':
        window.open(this._config['mova']['urlLegal'], '_blank');
        break;
      case 'urlPortales':
        window.open(this._config['mova']['urlPortals'], '_blank');
        break;

      default:
        break;
    }
  }

  goToHome(){
    this._router.navigate(['main-menu']);
  }

  doOnClickConditions() {

    let self = this;

    let data: any = {
      title: self.titleAccessConditions,
      text: self.textAccessConditions,
      acceptText: 'Aceptar',
      cancelText: 'Cancelar',
      maxWidth: self.widthAccessConditions,
      acceptColor: 'primary',
      cancelColor: 'warn'
    }

    this._appService.openDialog(data);
  }

}
