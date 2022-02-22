import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCOAComponent } from './accounts-coa.component';

describe('AccountsCOAComponent', () => {
  let component: AccountsCOAComponent;
  let fixture: ComponentFixture<AccountsCOAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCOAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
