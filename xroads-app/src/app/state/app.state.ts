import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { userInfoReducer } from './user-info.state';
import { UserInfo } from '../models/user-info';
import { Deacon } from '../models/deacon';
import { deaconReducer } from './deacon.state';


export interface IAppState {
    userInfo: IEntityState<UserInfo>;
    deacon: IEntityState<Deacon>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
    userInfo: userInfoReducer,
    deacon: deaconReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = [debug];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
