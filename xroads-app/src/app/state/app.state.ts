import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { userInfoReducer } from './user-info.state';
import { UserInfo } from '../models/user-info';
import { Deacon } from '../models/deacon';
import { deaconReducer } from './deacon.state';
import { DeaconCalendar } from '../models/deacon-calendar';
import { deaconCalendarReducer } from './deacon-calendar.state';
import { Attendee } from '../models/attendee';
import { attendeeReducer } from './attendee.state';
import { Diaconate } from '../models/diaconate';
import { diaconateReducer } from './diaconate.state';


export interface IAppState {
    userInfo: IEntityState<UserInfo>;
    deacon: IEntityState<Deacon>;
    diaconate: IEntityState<Diaconate>;
    deaconCalendar: IEntityState<DeaconCalendar>;
    attendee: IEntityState<Attendee>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
    userInfo: userInfoReducer,
    deacon: deaconReducer,
    diaconate: diaconateReducer,
    deaconCalendar: deaconCalendarReducer,
    attendee: attendeeReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = [debug];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log('reducer', reducer);
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
