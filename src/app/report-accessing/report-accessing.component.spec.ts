import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAccessingComponent } from './report-accessing.component';

describe('ReportAccessingComponent', () => {
  let component: ReportAccessingComponent;
  let fixture: ComponentFixture<ReportAccessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAccessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAccessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
