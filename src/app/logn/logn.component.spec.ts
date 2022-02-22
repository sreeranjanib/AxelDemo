import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LognComponent } from './logn.component';

describe('LognComponent', () => {
  let component: LognComponent;
  let fixture: ComponentFixture<LognComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LognComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LognComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
