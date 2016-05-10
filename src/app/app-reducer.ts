import {Reducer, combineReducers} from "@ngrx/store";

import {AppState} from "./app-interface";
import {underlyingsReducer} from "../shared";

export const appReducer: Reducer<AppState> = combineReducers({
    underlyings: underlyingsReducer
});
