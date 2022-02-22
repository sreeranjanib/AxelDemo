import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightlyTabsComponent } from './nightly-tabs.component';

describe('NightlyTabsComponent', () => {
  let component: NightlyTabsComponent;
  let fixture: ComponentFixture<NightlyTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightlyTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightlyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
