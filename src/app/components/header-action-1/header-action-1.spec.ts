import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAction1 } from './header-action-1.component';

describe('HeaderSettings', () => {
  let component: HeaderAction1;
  let fixture: ComponentFixture<HeaderAction1>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAction1 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAction1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
