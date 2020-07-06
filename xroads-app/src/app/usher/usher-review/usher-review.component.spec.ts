import { UsherReviewComponent } from './usher-review.component';

describe('UsherReviewComponent', () => {
  let component: UsherReviewComponent;


  beforeEach(() => {
    component = new UsherReviewComponent();
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

    it('when user login and has usher role should be able to update', () => {
        component.userInfo = {
          identityProvider: '',
          userDetails: '',
          userId: '',
          userRoles: ['usher', 'deacon', 'anonymous', 'authenticated']};
        component.checkRoles();
        expect(component.canUpdate).toBeTruthy();
      });

    it('when user login and not usher or admin role should not be able to update', () => {
        component.userInfo = {identityProvider: '', userDetails: '', userId: '', userRoles: ['nursery', 'anonymous', 'authenticated']};
        component.checkRoles();
        expect(component.canUpdate).toBeFalsy();
      });

  });
});
