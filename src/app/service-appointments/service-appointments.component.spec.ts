import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAppointmentsComponent } from './service-appointments.component';

describe('ServiceAppointmentsComponent', () => {
  let component: ServiceAppointmentsComponent;
  let fixture: ComponentFixture<ServiceAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
