import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Attendee } from '../models/attendee';

export const { initialState, selectors} = buildState(Attendee);

export const {
  selectAll: allAttendees,
  selectIsSaving: savingAttendee,
  selectLoadedAt: loadedAttendee,
  selectIsLoading: loadingAttendee,

} = selectors;

export function attendeeReducer(state = initialState): IEntityState<Attendee> {
  return state;
}
