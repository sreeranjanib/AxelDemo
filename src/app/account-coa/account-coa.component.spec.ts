import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCoaComponent } from './account-coa.component';

describe('AccountCoaComponent', () => {
  let component: AccountCoaComponent;
  let fixture: ComponentFixture<AccountCoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
