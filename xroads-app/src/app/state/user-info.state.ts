import { Action } from '@ngrx/store';
import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { UserInfo } from '../models/user-info';

export const { initialState, selectors} = buildState(UserInfo);

export const {
  selectAll: allUserInfo
} = selectors;

export function userInfoReducer(state = initialState): IEntityState<UserInfo> {
  return state;
}
