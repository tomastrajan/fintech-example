import {Reducer, combineReducers} from "@ngrx/store";

import {underlyingsReducer} from "../shared";
import {clientReducer} from "../clients";

import {AppState} from "./app-interface";

export const appReducer: Reducer<AppState> = combineReducers({
    underlyings: underlyingsReducer,
    clients: clientReducer
});
