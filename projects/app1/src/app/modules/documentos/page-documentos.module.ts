import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SearchDocumentsComponent } from "projects/app1/src/app/pages/documentos/search-documents/search-documents.component";
import { SearchResolucionesComponent } from "projects/app1/src/app/pages/documentos/search-resoluciones/search-resoluciones.component";
import { SearchEscritosComponent } from "projects/app1/src/app/pages/documentos/search-escritos/search-escritos.component";
import { DocumentCardComponent } from "../../components/document-card/document-card.component";
import { SharedUtilitiesModule } from "projects/app1/src/app/sharedModules/shared-utilities/shared-utilities.module";
import { AuthGuard } from "@mova/components/core";

const routes: Routes = [
  { path: "documentos", component: SearchDocumentsComponent, canActivate: [AuthGuard] },
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
  providers: [],
})
export class PagesDocumentsModule {}
