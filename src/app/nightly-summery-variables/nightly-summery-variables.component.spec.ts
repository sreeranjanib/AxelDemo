import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightlySummeryVariablesComponent } from './nightly-summery-variables.component';

describe('NightlySummeryVariablesComponent', () => {
  let component: NightlySummeryVariablesComponent;
  let fixture: ComponentFixture<NightlySummeryVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightlySummeryVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightlySummeryVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
