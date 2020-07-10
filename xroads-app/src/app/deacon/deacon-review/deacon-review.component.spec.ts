import { DeaconReviewComponent } from './deacon-review.component';

describe('DeaconReviewComponent', () => {
  let component: DeaconReviewComponent;
  let mockStore;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    component = new DeaconReviewComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
