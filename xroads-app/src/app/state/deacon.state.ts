import { buildState, IEntityState, EntityAction, EntityActions } from '@briebug/ngrx-auto-entity';
import { Deacon } from '../models/deacon';

export const { initialState, selectors} = buildState(Deacon);

export const {
  selectAll: allDeacons
} = selectors;

export function deaconReducer(state = initialState): IEntityState<Deacon> {
  return state;
}
