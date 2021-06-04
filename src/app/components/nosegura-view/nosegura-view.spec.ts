import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoseguraView } from './nosegura-view.component';

describe('NoseguraView', () => {
  let component: NoseguraView;
  let fixture: ComponentFixture<NoseguraView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoseguraView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoseguraView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
