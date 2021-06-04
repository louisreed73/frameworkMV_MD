import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionView } from './data-protection-view.component';

describe('DataProtectionView', () => {
  let component: DataProtectionView;
  let fixture: ComponentFixture<DataProtectionView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtectionView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProtectionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
