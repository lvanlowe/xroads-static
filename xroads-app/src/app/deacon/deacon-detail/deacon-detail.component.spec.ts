import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconDetailComponent } from './deacon-detail.component';

describe('DeaconDetailComponent', () => {
  let component: DeaconDetailComponent;
  let mockFormBuilder;
  let mockStore;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new DeaconDetailComponent(
      mockFormBuilder,
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
