import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SearchDocumentsComponent } from "projects/app2/src/app/pages/documentos/search-documents/search-documents.component";
import { SearchResolucionesComponent } from "projects/app2/src/app/pages/documentos/search-resoluciones/search-resoluciones.component";
import { SearchEscritosComponent } from "projects/app2/src/app/pages/documentos/search-escritos/search-escritos.component";
import { DocumentCardComponent } from "../../components/document-card/document-card.component";
import { SharedUtilitiesModule } from "projects/app2/src/app/sharedModules/shared-utilities/shared-utilities.module";

const routes: Routes = [
  { path: "documentos", component: SearchDocumentsComponent },
  { path: "resoluciones", component: SearchResolucionesComponent },
  { path: "escritos", component: SearchEscritosComponent },
];

@NgModule({
  declarations: [
    SearchDocumentsComponent,
    SearchResolucionesComponent,
    SearchEscritosComponent,
    DocumentCardComponent,
  ],
  imports: [CommonModule, SharedUtilitiesModule, RouterModule.forChild(routes)],
  exports: [
    // DocumentCardComponent,
  ],
  providers: [],
})
export class PagesDocumentsModule {}
