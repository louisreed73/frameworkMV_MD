import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileView } from './user-profile-view.component';

describe('UserProfileView', () => {
  let component: UserProfileView;
  let fixture: ComponentFixture<UserProfileView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
