import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeDetailComponent } from './attendee-detail.component';

describe('AttendeeDetailComponent', () => {
  let component: AttendeeDetailComponent;
  let mockFormBuilder;
  let mockStore;

  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new AttendeeDetailComponent(
      mockFormBuilder,
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
