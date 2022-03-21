import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVVehiclesComponent } from './cv-vehicles.component';

describe('CVVehiclesComponent', () => {
  let component: CVVehiclesComponent;
  let fixture: ComponentFixture<CVVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
