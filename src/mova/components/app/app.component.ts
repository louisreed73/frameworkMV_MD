import { Component, ChangeDetectorRef, Directive, HostListener, Input, isDevMode, NgZone, Renderer } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '@environments/environment';
import { AppService } from '@mova/components/core';
import { BackendService } from '@mova/components/core';
import { AuthGuard } from '@mova/components/core';
import { AuthenticationService } from '@mova/components/core';
import { DeviceService } from '@mova/components/core';
import { InterceptorService } from '@mova/components/core';
import { LocalStorageService } from '@mova/components/core';
import { NotificationService } from '@mova/components/core';
import { SessionStorageService } from '@mova/components/core';

import { LateralMenu } from '@app/components/lateral-menu/lateral-menu.component';

import config from '../../../app/config-default.json'; // JSON de configuración por defecto de la App
import configMainFrame from '../../../app/config-default-main-frame.json'; // JSON de configuración por defecto del contenedor principal

// Variable que ofrece la libreria JS de plugins. Hay que definirla porque si no al compilar falla
declare var CPLUGIN: any;
declare global {
    interface Window { handleOpenURL: any; }
}

window.handleOpenURL = window.handleOpenURL || {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*************
   * Variables *
   *************/

  // Variable con la configuración de la App
  private _isInitViewCheck : boolean;

  // Variable para ofrecer la configuración del mainFrame (se utiliza en el HTML)
  configMainFrame: object = configMainFrame;
  // Subscripción al método updateConfig del servicio App de MOVA
  subscriptionUpdateConfig: Subscription;
  // Subscripción al método showContentLoading del servicio App de MOVA
  subscriptionMainFrameConfigApplied: Subscription;
  // Subscripción al método onNotification del servicio App de MOVA
  subscriptionNotification: Subscription;
  // Subscripción al método onRegistrationSuccess del servicio App de MOVA
  subscriptionOnRegistrationSuccess: Subscription;
  // Subscripción al método onRegistrationError del servicio App de MOVA
  subscriptionOnRegistrationError: Subscription;

  /*****************
   * Constructores *
   *****************/

  constructor(
    private _appService: AppService,
    private _authenticationService: AuthenticationService,
    private _backendService: BackendService,
    private _deviceService: DeviceService,
    private _interceptorService: InterceptorService,
    private _localStorageService: LocalStorageService,
    private _notificationService: NotificationService,
    private _sessionStorageService: SessionStorageService,
    private _authGuard: AuthGuard,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    private _renderer: Renderer,
    private _router: Router,
  ) {

    // Reaccionar cuando la configuración del componente mvMainFrame cambie
    this.subscriptionMainFrameConfigApplied = this._appService.mainFrameConfigApplied$.subscribe(

      () => {

        /*
        Si se ha marcado la variable de recarga de la configuración del componente mvMainFrame con la configuración de este componente, AppComponent
        Esta variable se activa con cada navegación en el evento onActivate del componente mvMainFrame
        */
        if (this._appService.getReloadAppComponentMainFrameConfig()) {

          // No volver a cargar la configuración del appComponente para el mvMainFrame de nuevo, solo una única vez
          this._appService.setReloadAppComponentMainFrameConfig(false);

          /***********************************************
           * Configuración del header y del menú lateral *
           ***********************************************/

          let lateralMenuConfig = {
            "lateralComponents": {
              "component101": LateralMenu
            }
          }

          // Cargar el menú lateral con los datos que queremos.
          let mainFrameConfig = {
            "lateralMenuConfig": lateralMenuConfig
          }

          // Actualizar la configuración del mvMainFrame con la configuración del appComponent
          this._appService.updateMainFrameConfig(mainFrameConfig);
        }
      }
    );
  }

  /***********
   * Métodos *
   ***********/

  ngOnInit(): void {

    this._hackAngularRouterNavigate(); // Modificar la navegación de la clase Router de Angular

    /****************************************************************************************************
     * Este es el punto de inicialización de los servicios con los valores de configuración del entorno *
     ****************************************************************************************************/

    // Reaccionar a la carga de nuevas configuraciones de la App y de entorno
    this.subscriptionUpdateConfig = this._appService.updateConfig$.subscribe(

      (data: any) => {

        // Recoger la configuración de la App
        let appConfig = (data.appConfig) ? (data.appConfig) : config;
        // Recoger la configuración del entorno
        let environmentConfig = (data.environmentConfig) ? (data.environmentConfig) : environment;

        // ASIMILACIÓN DE CONFIGURACIONES
        this._appService.setConfig(appConfig); // Asimilar la configuración de la App
        this._appService.setConfigEnvironment(environmentConfig); // Asimilar la configuración por entorno

        // CONFIGURACIÓN DE SERVICIOS
        this._localStorageService.setConfig(); // Inicializar la configuración por entorno
        this._deviceService.setConfig(); // Inicializar la configuración por entorno
        this._interceptorService.setConfig(); // Inicializar la configuración por entorno
        this._authGuard.setConfig(); // Inicializar la configuración por entorno
        this._authenticationService.setConfig(); // Inicializar la configuración por entorno
        this._sessionStorageService.setConfig(); // Inicializar la configuración por entorno
        this._backendService.setConfig(); // Inicializar la configuración por entorno
        this._notificationService.setConfig(); // Inicializar la configuración por entorno

        // CONFIGURACIÓN DE COMPONENTES GENERALES
        this._appService.updateMainFrameConfig(); // Actualizar la configuración del componente mvMainFrame (siempre después de tener las configuraciones de App y de entorno)
      }
    );
    // Lanzar la primera carga de configuración con las configuraciones locales para la App y por entorno.
    this._appService.updateConfig(config, environment);

    // Reaccionar a la recepcion de notificaciones
    this.subscriptionNotification = this._appService.onNotificationReceived$.subscribe(
      (data: any) => {
        this.onNotificationReceived(data);
      }
    );
    // Reaccionar a la recepcion de notificaciones
    this.subscriptionOnRegistrationSuccess = this._appService.onRegistrationSuccess$.subscribe(
      (data: any) => {
        this.onRegistrationSuccess(data);
      }
    );
    // Reaccionar a la recepcion de notificaciones erroneas
    this.subscriptionOnRegistrationError = this._appService.onRegistrationError$.subscribe(
      (data: any) => {
        this.onRegistrationError(data);
      }
    );

    // Funcion handleOpenURL de Cordova que hay que sobreescribir para que al volver a la app desde autologin vaya a la vista de broker
    let self = this;
    document.addEventListener("deviceready", function() {
      window.handleOpenURL = function handleOpenURL(url) {
        setTimeout(function() {
          // Tenemos un ticket del broker
          let ticketParamName = '//ticket=';
          let ticketPosition = url.indexOf(ticketParamName);
          if (ticketPosition >= 0) {
            let ticket = url.substr(ticketPosition + ticketParamName.length);
            self._router.navigate(['/broker-view'], { queryParams: { ticket: ticket }});
          }
        }, 0);
      }
    });


  }

  ngAfterViewInit(): void {

  }

  /*
  ╔══════════════════════════════════════════════╗
  ║ Evento onNotification de notificationService ║
  ╚══════════════════════════════════════════════╝
  */

  /*
  Sobreescribir la reacción de la app ante la recepción de un mensaje
  Se recomienda respetar el código de propio de MOVA y mantener la estructura
  del código.
  */
  onNotificationReceived(data: any): void {

    let foreground = data.additionalData.foreground;
    // Parametro con un identificador
    let id = data.additionalData.infoapp.id;
    // Informacion environment
    // TODO: ver si se puede asignar a una variable de la clase como en todos los sitios
    let _configEnvironment = this._appService.getConfigEnvironment();

    /*
    ┌─────────────────────────────────────────┐
    │ Guardar la notificación en localStorage │
    └─────────────────────────────────────────┘
    ¡¡¡ IMPORTANTE !!! - Se guarda la notificación siempre, hay que recordar que este evento se
    dispara al recibir la notificación y al hacer click sobre ella, por lo que una misma notificación
    puede guardarse varias veces. La responsabilidad de no sacar información duplicada será del código
    que consulte las notificaciones guardadas que deberá controlar que muestra las que quiere mostrar,
    por ejemplo las notificaciones con foreground con valor true.
    */

    // Recuperar el histórico de notificaciones que pueda existir
    let historicoNotificaciones = this._localStorageService.getItem('MovaNotificacionesRecibidas');

    // Si no existe creamos el array
    if (typeof historicoNotificaciones === 'undefined') historicoNotificaciones = [];

    // Guardamos la notificación en el array, siempre se guarda al principio la más reciente
    historicoNotificaciones.unshift(data);

    // Aplicar límite de notificaciones a guardar.
    historicoNotificaciones.splice(_configEnvironment['notificationService']['receivedLimit']);

    // Guardamos el array de notificaciones en local
    this._localStorageService.setItem('MovaNotificacionesRecibidas', historicoNotificaciones);

    /*
    ┌───────────────────────────────────────────┐
    │ Lógica de respuesta ante una notificación │
    └───────────────────────────────────────────┘
    */

    /*
    La variables foreground con valor false siginica que se ha hecho click en la notificación
    desde el centro de notificaciones de ios o desde la notificación nativa de Android.
    */
    if (foreground === false) {
      // Implementar la reacción en caso de hacer click en una incidencia recibida
      // Ejemplo de navegación a estado con identificador por parámetro
      //this._router.navigate(['ejemplo-estado'], { id: id});
    } else {

      /***********************************************************************************
       * INI - Comportamiento especial para iOS cuando la app esta en primer plano - INI *
       ***********************************************************************************/

      /*
      Si el entorno es iOS y estamos con la app abierta no vemos ninguna incidencia al recibirla,
      porque se queda solo en el centro de notificaciones, por lo que MOVA implementa la aparición
      de un mensaje para este caso.
      */
      if (
        (this._deviceService.getMobileInfo().platform == 'iOS') &&
        (_configEnvironment['notificationService']['alwaysShowIosTemplate'])
      ) {

        // Mostramos la notificacion en ios
        let notifData: any = {
          id: id,
          title: data.title,
          text: data.message,
          delay: 7500
        };


        // Funcion a ejecutar cuando hacemos click en la notificacion
        let self = this;
        notifData.notificationClick = function() {
          // Ejemplo de navegación a estado con identificador por parámetro
          //self._router.navigate(['ejemplo-estado'], { id: id});
        };

        this._appService.showNotificationTemplate(notifData);
      }

      /**********************************************************************************
       * FIN -Comportamiento especial para iOS cuando la app esta en primer plano - FIN *
       **********************************************************************************/
    }
  };

  /*
  ╔══════════════════════════════════════════════╗
  ║ Evento onRegistration de notificationService ║
  ╚══════════════════════════════════════════════╝
  */

  /*
  Sobreescribir la reacción de la app ante el registro del dispositivo
  */
  onRegistrationSuccess(data: any): void {
  };

  /*
  ╔══════════════════════════════════════════════╗
  ║ Evento onRegistration de notificationService ║
  ╚══════════════════════════════════════════════╝
  */

  /*
  Sobreescribir la reacción de la app ante el fallo en el registro del dispositivo
  */
  onRegistrationError(data: any): void {
  };

  /**
   *
   * ¡¡¡ IMPORTANTE !!!
   *
   * Sobreescribe los métodos Router.prototype.navigate y Router.prototype.navigateByUrl para mostrar el loading
   * antes de empezar la navegación. Antes incluso de que se desencadene el primer evento de navegación
   * 'NavigationStart'.
   *
   * Esta modificación es necesaria ya que una vez empiece la navegación la vista se bloquea y no se ven los cambios,
   * por lo que el loading no aparecería nunca si no se consigue mostrar antes de empezar la navegación.
   * Además, durante el tiempo que tarde la navegación algunas animaciones (ej: transformaciones con porcentajes) dejan
   * de funcionar y la animación se congela o funciona de forma extraña, por este motivo el loading de navegación se
   * ha diseñádo solo con animaciones no conflictivas y con muchas limitaciones.
   *
   * Si se cambia de versión de Angular puede que este funcionamiento cambie radicalmente y, no solo deje de funcionar,
   * si no que puede dejar de funcionar la navegación completamente.
   *
   */
  private _hackAngularRouterNavigate = function () {

    let self = this; // this de la clase actual

    /*****************************
     * Router.prototype.navigate *
     *****************************/

    function validateCommands(commands: any) {
      for (var i = 0; i < commands.length; i++) {
          var cmd = commands[i];
          if (cmd == null) {
              throw new Error("The requested path contains " + cmd + " segment at index " + i);
          }
      }
    }
    Router.prototype.navigate = function (commands, extras) {

      // MOVA --> Mostrar el loading
      self._appService.showContentProgressLoading(true);
      //self._appService.showContentLoading(true);

      if (extras === void 0) { extras = { skipLocationChange: false }; }
      validateCommands(commands);

      let selfRouter = this; // this de la clase Router

      return new Promise(resolve =>
        setTimeout(() =>
        selfRouter.navigateByUrl(selfRouter.createUrlTree(commands, extras), extras)
        ,10)
      );
    };

    /**********************************
     * Router.prototype.navigateByUrl *
     **********************************/

    function isUrlTree(v: any) {
      return v instanceof UrlTree;
    }
    Router.prototype.navigateByUrl = function (url, extras) {

      // MOVA --> Mostrar el loading
      self._appService.showContentProgressLoading(true);
      //self._appService.showContentLoading(true);

      if (extras === void 0) { extras = { skipLocationChange: false }; }
      if (isDevMode() && this.isNgZoneEnabled && !NgZone.isInAngularZone()) {
          this.console.warn("Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
      }
      var urlTree = isUrlTree(url) ? url : this.parseUrl(url);
      var mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);

      let selfRouter = this; // this de la clase Router

      return new Promise(resolve =>
        setTimeout(() =>
          selfRouter.scheduleNavigation(mergedTree, 'imperative', null, extras)
        ,10)
      );
    };
  }

}
