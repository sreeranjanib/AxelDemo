import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAppointmentObjectiveComponent } from './service-appointment-objective.component';

describe('ServiceAppointmentObjectiveComponent', () => {
  let component: ServiceAppointmentObjectiveComponent;
  let fixture: ComponentFixture<ServiceAppointmentObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAppointmentObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAppointmentObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
