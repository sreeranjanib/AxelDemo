import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSAGComponent } from './test-sag.component';

describe('TestSAGComponent', () => {
  let component: TestSAGComponent;
  let fixture: ComponentFixture<TestSAGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSAGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSAGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
