import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let mockRouter;


  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('router', ['config']);
    mockRouter.config = [];
    component = new AppComponent(mockRouter);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Crossroads PCA Web App'`, () => {
    expect(component.title).toEqual('Crossroads PCA Web App');
  });


});
