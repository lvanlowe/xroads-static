import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let mockRouter;
  let mockStore;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('router', ['config']);
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    mockRouter.config = [];
    component = new AppComponent(mockRouter, mockStore);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Crossroads PCA Web App'`, () => {
    expect(component.title).toEqual('Crossroads PCA Web App');
  });

  describe('When Logging in', () => {

    beforeEach(() => {
      component.canLogin = true;
      component.canLogout = false;
    });

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

      component.onLogon();
      expect(component.canLogin).toBeTruthy();
    });

    it('should have CanLogout to be false', () => {

      component.onLogon();
      expect(component.canLogout).toBeFalsy();
    });

    it('should have Button text to be Login', () => {

      component.logButtonText = 'Logout';
      component.onLogon();
      expect(component.logButtonText).toBe('Login');
    });

    it('should not have a greeting', () => {

      component.greeting = 'Hi Van';
      component.onLogon();
      expect(component.greeting).toBe('');
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

      it('should have Button text to be Logout', () => {

        component.checkUser();
        expect(component.logButtonText).toBe('Logout');
      });

      it('should have a greeting', () => {

        component.checkUser();
        expect(component.greeting).toBe('Hi Van');
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

      it('should have Button text to be Login', () => {
         component.checkUser();
         expect(component.logButtonText).toBe('Login');
      });

      it('should not have a greeting', () => {

        component.greeting = 'Hi Van';
        component.checkUser();
        expect(component.greeting).toBe('');
      });
    });

  });

});
