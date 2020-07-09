import { Action, createSelector } from '@ngrx/store';
import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { UserInfo } from '../models/user-info';

export const { initialState, selectors} = buildState(UserInfo);

export const {
  selectAll: allUserInfo,
  selectCurrentEntity: currentUserInfo,
} = selectors;

export function userInfoReducer(state = initialState): IEntityState<UserInfo> {
  return state;
}

export const isAdminRole = createSelector(
  currentUserInfo,
  (userInfo) => {
    if (userInfo && userInfo.userRoles.find(u => u === 'usher')) {
    return true;
  } else {
    return false;
  }}

);
