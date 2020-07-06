import { NurseryReviewComponent } from './nursery-review.component';

describe('NurseryReviewComponent', () => {
  let component: NurseryReviewComponent;

  beforeEach(() => {
    component = new NurseryReviewComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When checking roles', () => {
    it('when user not login should not be able to update', () => {
      expect(component.canUpdate).toBeFalsy();
    });

    it('when user login and has admin role should be able to update', () => {
        component.userInfo = {identityProvider: '', userDetails: '', userId: '', userRoles: ['admin', 'anonymous', 'authenticated']}
        component.checkRoles();
        expect(component.canUpdate).toBeTruthy();
      });

    it('when user login and has nursery role should be able to update', () => {
        component.userInfo = {
          identityProvider: '',
          userDetails: '',
          userId: '',
          userRoles: ['nursery', 'anonymous', 'authenticated']};
        component.checkRoles();
        expect(component.canUpdate).toBeTruthy();
      });

    it('when user login and not nursery or admin role should not be able to update', () => {
        component.userInfo = {identityProvider: '', userDetails: '', userId: '', userRoles: ['usher', 'anonymous', 'authenticated']};
        component.checkRoles();
        expect(component.canUpdate).toBeFalsy();
      });

  });

});
