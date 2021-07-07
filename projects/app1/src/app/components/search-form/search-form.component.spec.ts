import { Location } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonTriggerComponent } from "../../sharedComponents/button-trigger/button-trigger.component";
import { SharedUtilitiesModule } from "../../sharedModules/shared-utilities/shared-utilities.module";
import { SearchFormComponent } from "./search-form.component";

describe("Search Form Component", () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
        imports: [SharedUtilitiesModule, HttpClientModule, Location],
        providers: [{ provide: Window, value: Window }],
    //   schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Creates Search Form Component", () => {
    expect(component).toBeTruthy();
  });
});
