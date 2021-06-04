import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenu } from './main-menu.component';

describe('MainMenu', () => {
  let component: MainMenu;
  let fixture: ComponentFixture<MainMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
