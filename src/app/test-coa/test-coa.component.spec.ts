import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCOAComponent } from './test-coa.component';

describe('TestCOAComponent', () => {
  let component: TestCOAComponent;
  let fixture: ComponentFixture<TestCOAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCOAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
