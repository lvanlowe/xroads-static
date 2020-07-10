import { NurseryReviewComponent } from './nursery-review.component';

describe('NurseryReviewComponent', () => {
  let component: NurseryReviewComponent;
  let mockStore;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    component = new NurseryReviewComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
