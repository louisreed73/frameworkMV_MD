import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingView } from './landing-view.component';

describe('LandingView', () => {
  let component: LandingView;
  let fixture: ComponentFixture<LandingView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
