import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { FilterTabsComponent } from "./filter-tabs.component";
import { RouterTestingModule } from '@angular/router/testing';

describe("Filter Tabs creation", () => {
  let component: FilterTabsComponent;
  let fixture: ComponentFixture<FilterTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTabsComponent],
      imports:[RouterTestingModule],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    // component = new FilterTabsComponent();
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterTabsComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    fixture.detectChanges();
  }));

  it("creation",  () => {
    expect(component).toBeTruthy();
  });
  it("Filter Tabs property",  () => {
    expect(component.num).toEqual(23);
  });
});
