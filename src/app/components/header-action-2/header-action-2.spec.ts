import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAction2 } from './header-action-2.component';

describe('HeaderAction2', () => {
  let component: HeaderAction2;
  let fixture: ComponentFixture<HeaderAction2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAction2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAction2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
