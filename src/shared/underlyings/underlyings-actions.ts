import {Action} from "@ngrx/store";
import {
    UNDERLYING_CCYPAIR_SET_ACTIVE,
    UNDERLYING_CCYPAIR_SET_FAVOURITE,
    UNDERLYING_CCYPAIR_VALUE_UPDATE
} from "./underlyings-reducer";

export function setCcypairActive(ccypair: string, active: boolean): Action {
    return {
        type: UNDERLYING_CCYPAIR_SET_ACTIVE,
        payload: {ccypair, active}
    };
}

export function setCcypairFavourite(ccypair: string, favourite: boolean): Action {
    return {
        type: UNDERLYING_CCYPAIR_SET_FAVOURITE,
        payload: {ccypair, favourite}
    };
}

export function updateCcypairValue(ccypair: string, bid: string, ask: string): Action {
    return {
        type: UNDERLYING_CCYPAIR_VALUE_UPDATE,
        payload: {ccypair, ask, bid}
    };
}