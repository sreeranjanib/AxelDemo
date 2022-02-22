import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSalesCurrentMonthReportComponent } from './vehicle-sales-current-month-report.component';

describe('VehicleSalesCurrentMonthReportComponent', () => {
  let component: VehicleSalesCurrentMonthReportComponent;
  let fixture: ComponentFixture<VehicleSalesCurrentMonthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSalesCurrentMonthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSalesCurrentMonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
