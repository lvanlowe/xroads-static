import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeDashboardComponent } from './attendee-dashboard.component';

describe('AttendeeDashboardComponent', () => {
  let component: AttendeeDashboardComponent;
  let mockFormBuilder;
  let mockStore;


  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('formBuilder', ['group']);
    mockStore = jasmine.createSpyObj('store', ['dispatch']);

    component = new AttendeeDashboardComponent(
      mockFormBuilder,
      mockStore
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
