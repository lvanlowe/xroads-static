import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconDashboardComponent } from './deacon-dashboard.component';

describe('DeaconDashboardComponent', () => {
  let component: DeaconDashboardComponent;
  let fixture: ComponentFixture<DeaconDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaconDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaconDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
