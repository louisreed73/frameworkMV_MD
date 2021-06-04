import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAction3 } from './header-action-3.component';

describe('HeaderAction3', () => {
  let component: HeaderAction3;
  let fixture: ComponentFixture<HeaderAction3>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAction3 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAction3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
