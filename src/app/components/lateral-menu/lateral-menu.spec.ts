import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralMenu } from './lateral-menu.component';

describe('LateralMenu', () => {
  let component: LateralMenu;
  let fixture: ComponentFixture<LateralMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
