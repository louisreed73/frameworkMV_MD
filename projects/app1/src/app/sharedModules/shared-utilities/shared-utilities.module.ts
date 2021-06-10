import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "../../sharedComponents/spinner/spinner.component";
import { MatProgressSpinnerModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FijarDirective } from "projects/app1/src/app/directives/fijar.directive";
import { FiltroComponent } from "../../sharedComponents/filtro/filtro.component";
import { AutocompleteComponent } from "../../sharedComponents/autocomplete/autocomplete.component";
import { ButtonTriggerComponent } from "../../sharedComponents/button-trigger/button-trigger.component";
import { PercentageBarComponent } from "../../sharedComponents/percentage-bar/percentage-bar.component";
import { CollapsibleComponent } from "../../sharedComponents/collapsible/collapsible.component";
import { DocumentCardComponent } from "projects/app1/src/app/components/document-card/document-card.component";
import { ResumeDocumentComponent } from "../../sharedComponents/resume-document/resume-document.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    FijarDirective,
    AutocompleteComponent,
    FiltroComponent,
    ButtonTriggerComponent,
    PercentageBarComponent,
    CollapsibleComponent,
    ResumeDocumentComponent,
    // DocumentCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatProgressSpinnerModule,
    FiltroComponent,
    FijarDirective,
    AutocompleteComponent,
    ButtonTriggerComponent,
    PercentageBarComponent,
    CollapsibleComponent,
    ResumeDocumentComponent,

    // DocumentCardComponent,
  ],
})
export class SharedUtilitiesModule {}
