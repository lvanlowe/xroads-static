import { UsherReviewComponent } from './usher-review.component';

describe('UsherReviewComponent', () => {
  let component: UsherReviewComponent;
  let mockStore;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    component = new UsherReviewComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
