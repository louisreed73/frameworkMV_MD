import { BrowserModule } from "@angular/platform-browser";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataRetrievalInterceptor } from "./interceptors/data-retrieval.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import {
  NgxExtendedPdfViewerModule,
  // NgxExtendedPdfViewerService,
  // NgxExtendedPdfViewerServerComponent,
} from "ngx-extended-pdf-viewer";
// import { DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
// import { PdfFindbarService } from "ngx-extended-pdf-viewer/lib/toolbar/pdf-findbar/pdf-findbar-service";

// import {serverAPI} from "./mirage.api";

/**
 *
 * Providers Array
 * Interceptor
 * and Global Object Window
 *
 */
const providers: Array<any> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: DataRetrievalInterceptor,
    multi: true,
  },
  {
    provide: Window,
    useValue: window,
  },
];

@NgModule({})
export class App1Module {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: providers,
    };
  }
}

/**
 *
 * Root Module of the app Buscador
 *
 */
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    // NgxExtendedPdfViewerModule,
    // NgxExtendedPdfViewerService
  ],
  providers: providers,
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // serverAPI();
  }
}
