import {Reducer, Action} from "@ngrx/store";

import {FxState} from "./underlyings-interface";
import {UNDERLYING_FX_UPDATE} from "./underlyings-constants";

export const fxUnderlyingsReducer: Reducer<FxState> =
    (state: FxState = {}, action: Action): FxState => {
        switch (action.type) {
            case UNDERLYING_FX_UPDATE:
                state[action.payload.ccypair] = action.payload;
                return Object.assign({}, state);

            default:
                return state;
        }
    };
