import {Reducer, Action} from "@ngrx/store";
import {FxState} from "./underlyings-interface";
import {
    UNDERLYING_FX_UPDATE,
    UNDERLYING_FX_CCYPAIR_ADD,
    UNDERLYING_FX_CCYPAIR_REMOVE
} from "./underlyings-constants";

const initialState = {ccypairs: ["USD/EUR"], values: {}};

export const fxUnderlyingsReducer: Reducer<FxState> =
    (state: FxState = initialState, action: Action): FxState => {
        switch (action.type) {

            case UNDERLYING_FX_CCYPAIR_ADD:
                if (state.ccypairs.indexOf(action.payload) === -1) {
                    state.ccypairs = [...state.ccypairs, action.payload];
                    return Object.assign({}, state);
                }
                return state;

            case UNDERLYING_FX_CCYPAIR_REMOVE:
                state.ccypairs = state.ccypairs
                    .filter(p => p !== action.payload);
                return Object.assign({}, state);

            case UNDERLYING_FX_UPDATE:
                state.values[action.payload.ccypair] = action.payload;
                return Object.assign({}, state);

            default:
                return state;
        }
    };
