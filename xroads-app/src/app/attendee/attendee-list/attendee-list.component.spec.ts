import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeListComponent } from './attendee-list.component';

describe('AttendeeListComponent', () => {
  let component: AttendeeListComponent;
  let mockStore;

 beforeEach(() => {
   mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new AttendeeListComponent(
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
