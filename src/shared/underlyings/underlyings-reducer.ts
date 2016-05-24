import { Reducer, Action, combineReducers } from "@ngrx/store";
import { Underlyings, CcyPair, CcyPairValues } from "./underlyings-interface";

export const UNDERLYING_CCYPAIR_SET_ACTIVE: string = "UNDERLYING_CCYPAIR_SET_ACTIVE";
export const UNDERLYING_CCYPAIR_SET_FAVOURITE: string = "UNDERLYING_CCYPAIR_SET_FAVOURITE";
export const UNDERLYING_CCYPAIR_VALUE_UPDATE: string = "UNDERLYING_CCYPAIR_VALUE_UPDATE";

const initialCcypairs: any = [
    { value: "USD/EUR", active: false },
    { value: "USD/GBP", active: false },
    { value: "USD/CHF", active: false },
    { value: "USD/AUD", active: false }
];

export const ccypairs: Reducer<CcyPair[]> =
    (state: CcyPair[] = initialCcypairs, action: Action): CcyPair[] => {
        switch (action.type) {

            case UNDERLYING_CCYPAIR_SET_ACTIVE:
                return state.map((p: CcyPair) => {
                    if (p.value === action.payload.ccypair) {
                        p.active = action.payload.active;
                    }
                    return p;
                });

            case UNDERLYING_CCYPAIR_SET_FAVOURITE:
                return state.map((p: CcyPair) => {
                    if (p.value === action.payload.ccypair) {
                        p.favourite = action.payload.favourite;
                    }
                    return p;
                });

            default:
                return state;
        }
    };

export const values: Reducer<CcyPairValues> =
    (state: CcyPairValues = {}, action: Action): CcyPairValues => {
        switch (action.type) {

            case UNDERLYING_CCYPAIR_VALUE_UPDATE:
                return Object.assign({}, state, action.payload);

            default:
                return state;
        }
    };


export const underlyings: Reducer<Underlyings> = combineReducers({
    ccypairs, values
});
