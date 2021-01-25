import { buildState, IEntityState } from "@briebug/ngrx-auto-entity";
import {Diaconate} from '../models/diaconate';

export const { initialState, selectors} = buildState(Diaconate);

export const {
  selectAll: allDiaconates,
  selectIsSaving: savingDiaconate,
  selectLoadedAt: loadedDiaconate,
  selectIsLoading: loadingDiaconate,

} = selectors;

export function diaconateReducer(state = initialState): IEntityState<Diaconate> {
  return state;
}
