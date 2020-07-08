import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { userInfoReducer } from './user-info.state';
import { UserInfo } from '../models/user-info';

// import { Customer, Order } from '../models';
// import { customerReducer } from './customer.state';
// import { orderReducer } from './order.state';

export interface IAppState {
    userInfo: IEntityState<UserInfo>;
    // order: IEntityState<Order>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
    userInfo: userInfoReducer,
    // order: orderReducer
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
