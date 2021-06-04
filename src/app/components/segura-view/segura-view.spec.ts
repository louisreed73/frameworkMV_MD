import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguraView } from './segura-view.component';

describe('SeguraView', () => {
  let component: SeguraView;
  let fixture: ComponentFixture<SeguraView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguraView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguraView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
