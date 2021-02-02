import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { createSelector } from '@ngrx/store';
import { Attendee } from '../models/attendee';

export const { initialState, selectors} = buildState(Attendee);

export const {
  selectAll: allAttendees,
  selectIsSaving: savingAttendee,
  selectLoadedAt: loadedAttendee,
  selectIsLoading: loadingAttendee,
  selectCurrentEntity: currentAttendee,
  selectSavedAt: savedAttendee,

} = selectors;

export function attendeeReducer(state = initialState): IEntityState<Attendee> {
  return state;
}

export const deaconAttendees = createSelector(allAttendees, a => a.filter(a => a.isDeacon))
