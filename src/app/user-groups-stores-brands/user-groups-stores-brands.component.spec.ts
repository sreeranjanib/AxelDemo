import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsStoresBrandsComponent } from './user-groups-stores-brands.component';

describe('UserGroupsStoresBrandsComponent', () => {
  let component: UserGroupsStoresBrandsComponent;
  let fixture: ComponentFixture<UserGroupsStoresBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsStoresBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsStoresBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
