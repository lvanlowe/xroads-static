import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconDashboardComponent } from './deacon-dashboard.component';

describe('DeaconDashboardComponent', () => {
  let component: DeaconDashboardComponent;
  let mockFormBuilder;
  let mockStore;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new DeaconDashboardComponent(
      mockFormBuilder,
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
