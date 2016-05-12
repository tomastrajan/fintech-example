import {Reducer, combineReducers} from "@ngrx/store";

import {underlyings} from "../shared";
import {clients} from "../clients";

import {AppState} from "./app-interface";

export const appReducer: Reducer<AppState> = combineReducers({
    underlyings, clients
});
