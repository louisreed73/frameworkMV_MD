import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { SearchLayoutComponent } from "./layouts/search-layout/search-layout.component";
import { DocumentoComponent } from "./pages/documento/documento.component";
import { FilterTabsComponent } from "./components/filter-tabs/filter-tabs.component";
import { DetailLayoutComponent } from "./layouts/detail-layout/detail-layout.component";
import { CommonModule } from "@angular/common";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { SharedUtilitiesModule } from "./sharedModules/shared-utilities/shared-utilities.module";
import { UserInputComponent } from "./components/user-input/user-input.component";
import {
  NgxExtendedPdfViewerModule,
} from "ngx-extended-pdf-viewer";
import { DetailDocumentResolveGuard } from "./services/documento-detail-resolver.service";

const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "documentos" },
  {
    path: "",
    component: SearchLayoutComponent,
    loadChildren: () =>
      import("./modules/documentos/page-documentos.module").then(
        (m) => m.PagesDocumentsModule
      ),
  },
  {
    path: "documento/:id",
    component: DetailLayoutComponent,
    resolve: { documento: DetailDocumentResolveGuard },
    //     children: [
    //       {
    //         path: ":id",
    //         component: DocumentoComponent,
    //       },
    //     ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    CommonModule,
    SharedUtilitiesModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [RouterModule],
  declarations: [
    SearchLayoutComponent,
    DetailLayoutComponent,
    DocumentoComponent,
    FilterTabsComponent,
    SearchFormComponent,
    UserInputComponent,
  ],
})
export class AppRoutingModule {}
