import {Reducer, combineReducers} from "@ngrx/store";

import {Underlyings} from "./underlyings-interface";
import {fxUnderlyingsReducer} from "./underlyings-fx-reducer";

export const underlyingsReducer: Reducer<Underlyings> = combineReducers({ 
    fx: fxUnderlyingsReducer 
});
