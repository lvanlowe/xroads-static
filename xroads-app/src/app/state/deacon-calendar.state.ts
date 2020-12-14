import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { DeaconCalendar } from '../models/deacon-calendar';

export const { initialState, selectors} = buildState(DeaconCalendar);

export const {
  selectAll: allDeaconCalendars
} = selectors;

export function deaconCalendarReducer(state = initialState): IEntityState<DeaconCalendar> {
  return state;
}
