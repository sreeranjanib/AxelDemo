import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VAutoInventoryComponent } from './vauto-inventory.component';

describe('VAutoInventoryComponent', () => {
  let component: VAutoInventoryComponent;
  let fixture: ComponentFixture<VAutoInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VAutoInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VAutoInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
