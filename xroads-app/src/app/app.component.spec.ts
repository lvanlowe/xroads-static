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

  describe('When Logging in', () => {

    it('should have CanLogin to be false', () => {

      component.onLogon();
      expect(component.canLogin).toBeFalsy();
    });

    it('should have CanLogout to be false', () => {

      component.onLogon();
      expect(component.canLogout).toBeFalsy();
    });
  });

  describe('When Loggingout', () => {

    beforeEach(() => {
      component.canLogin = false;
      component.canLogout = true;
    });

    it('should have CanLogin to be true', () => {

      component.onLogOut();
      expect(component.canLogin).toBeTruthy();
    });

    it('should have CanLogout to be false', () => {

      component.onLogOut();
      expect(component.canLogout).toBeFalsy();
    });
  });

  describe('Checking user', () => {

    describe('and there is userinfo', () => {

      beforeEach(() => {
        component.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: '', userRoles:[] }
      });

      it('should have CanLogin to be false', () => {

        component.checkUser();
        expect(component.canLogin).toBeFalsy();
      });

      it('should have CanLogout to be true', () => {

        component.checkUser();
        expect(component.canLogout).toBeTruthy();
      });
    });

    describe('and there is no userinfo', () => {

      it('should have CanLogin to be true', () => {

        component.checkUser();
        expect(component.canLogin).toBeTruthy();
      });

      it('should have CanLogout to be false', () => {

        component.checkUser();
        expect(component.canLogout).toBeFalsy();
      });
    });
  });

});
