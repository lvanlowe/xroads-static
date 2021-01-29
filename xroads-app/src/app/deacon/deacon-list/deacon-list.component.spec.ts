import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconListComponent } from './deacon-list.component';

describe('DeaconListComponent', () => {
  let component: DeaconListComponent;
  let mockStore;

  beforeEach(() => {
   mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new DeaconListComponent(
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
