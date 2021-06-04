/**************************************************
 * Componentes externos, de Material y de Angular *
 **************************************************/

import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, ExtraOptions, Router } from '@angular/router';
import { HighlightModule } from 'ngx-highlightjs';
import { MatomoModule } from 'ngx-matomo';
import { DateAdapter } from '@angular/material';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');


//---------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- NO TOCAR EL CÓDIGO CONTENIDO ENTRE ESTAS LINEAS -------------------------------------------//
//-----------------------------------------------------------------( INI )---------------------------------------------------------------//

/*****************************
 * Elementos propios de MOVA *
 *****************************/

// Módulos:
import { MaterialModule } from '../mova/modules/material.module'; // Incluir el módulo de material
import { MovaModule } from '../mova/modules/mova.module'; // Incluir el módulo de MOVA

// Componentes MOVA:
import { AppComponent } from '../mova/components/app/app.component'; // Componente principal de la App preparado para MOVA
import { AuthGuard } from '@mova/components/core'; // AuthGuard
import { MvDeviceView } from '@mova/components/device-view';
import { MvDateAdapter } from '@mova/components/core';
import { InterceptorService } from '@mova/components/core';
import { MvBrokerView } from '@mova/components/broker-view'; // Vista del broker de identidades
import { MvDialog } from '@mova/components/dialog';
import { MvDialogError } from '@mova/components/dialog-error';
import { MvSnackBar } from '@mova/components/snack-bar';
import { MvInitView } from '@mova/components/init-view'; // Vista de inicio
import { MvLoginView } from '@mova/components/login-view'; // Vista de login
import { MvRateView } from '@mova/components/rate-view'; // Vista de valoracion de la app
import { LandingView } from './components/landing-view/landing-view.component';// Vista de presentacion

const MOVA_COMPONENTS = [AppComponent]; // Declarations
const MOVA_ENTRY_COMPONENTS = [MvDialog, MvDialogError, MvSnackBar]; // EntryComponents
const MOVA_PROVIDERS = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}; // Providers

// Routes:
const MOVA_ROUTES: any = [
  { path: 'broker-view', component: MvBrokerView },
  { path: 'device-view', component: MvDeviceView },
  { path: 'init-view', component: MvInitView, canDeactivate: [AuthGuard] },
  { path: 'landing-view', component: LandingView },
  { path: 'login-view', component: MvLoginView },
  { path: 'rate-view', component: MvRateView },
]

// Opciones de navegación
const ROUTER_OPTIONS: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'disabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64], // Corregir esto cuando exista header de la plantilla
};

/*****************************************************
 * Configuración de la dependencia 'ngx-highlightjs' *
 *****************************************************/

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

//---------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- NO TOCAR EL CÓDIGO CONTENIDO ENTRE ESTAS LINEAS -------------------------------------------//
//-----------------------------------------------------------------( FIN )---------------------------------------------------------------//

/*************************
 * Componentes de la App *
 *************************/

// Componentes de acción para ser insertados de forma dinámica
import { HeaderAction1 } from './components/header-action-1/header-action-1.component'; // Definir en el nodo entryComponents
import { HeaderAction2 } from './components/header-action-2/header-action-2.component'; // Definir en el nodo entryComponents
import { HeaderAction3 } from './components/header-action-3/header-action-3.component'; // Definir en el nodo entryComponents
import { LateralMenu } from './components/lateral-menu/lateral-menu.component'; // Definir en el nodo entryComponents

// Incluir en orden alfabético de la ruta de importación los componentes de la App
import { DataProtectionView } from './components/data-protection-view/data-protection-view.component';
import { MainMenu } from './components/main-menu/main-menu.component';
import { UserProfileView } from './components/user-profile-view/user-profile-view.component';
import { NoseguraView } from './components/nosegura-view/nosegura-view.component';
import { SeguraView } from './components/segura-view/segura-view.component';

/**********************************
 * Configuración de la navegación *
 **********************************/

// Incluir en orden alfabético los componentes de navegación
const appRoutes: Routes = [
  ...MOVA_ROUTES, // MOVA -> Necesario para el funcionamiento de MOVA
  { path: 'data-protection-view', component: DataProtectionView },
  { path: 'main-menu', component: MainMenu },
  { path: 'user-profile-view', component: UserProfileView },
  { path: 'nosegura-view', component: NoseguraView },
  { path: 'segura-view', component: SeguraView, canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'init-view' },
  { path: '**', redirectTo: 'init-view' }
];

/***************************
 * Configuración de fechas *
 ***************************/

/**
 * Formatos que se utilizarán en la aplicación para mostrar fechas.
 * Se pueden consultar los formatos disponibles aquí https://momentjs.com/docs/#/displaying/format/
 * Variarán dependiendo del locale establecido. En Mova está configurado el adaptador español.
 */
const MOMENT_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

/********************
 * Módulo principal *
 ********************/

@NgModule({
  // Incluir los componentes en orden alfabético respetando el formato camelCase
  declarations: [
    ...MOVA_COMPONENTS, // MOVA -> Necesario para el funcionamiento de MOVA
    DataProtectionView,
    HeaderAction1,
    HeaderAction2,
    HeaderAction3,
    LateralMenu,
    MainMenu,
    LandingView,
    UserProfileView,
    NoseguraView,
    SeguraView,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MovaModule,
    RouterModule.forRoot(
      appRoutes,
      ROUTER_OPTIONS),
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatomoModule
  ],
  // Incluir los componentes que necesiten ser incluidos dinámicamente (mv-component-host)
  entryComponents: [
    ...MOVA_ENTRY_COMPONENTS, // MOVA -> Necesario para el funcionamiento de MOVA
    HeaderAction1, // Componente de acción 1 del header
    HeaderAction2, // Componente de acción 2 del header
    HeaderAction3, // Componente de acción 3 del header
    LateralMenu, // Componente del menú lateral
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    MOVA_PROVIDERS,
    {
      provide: MAT_DATE_FORMATS,
      useValue: MOMENT_FORMATS
    },
    {
      provide: DateAdapter, // Adaptador para que datepicker coja los dias desde el lunes
      useClass: MvDateAdapter
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    ApplicationRef,
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue:
      {
        displayDefaultIndicatorType: false,
        showError: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
