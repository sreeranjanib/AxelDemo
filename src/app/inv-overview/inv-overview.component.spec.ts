import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvOverviewComponent } from './inv-overview.component';

describe('InvOverviewComponent', () => {
  let component: InvOverviewComponent;
  let fixture: ComponentFixture<InvOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
