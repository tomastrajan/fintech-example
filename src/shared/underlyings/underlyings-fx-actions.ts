import {Action} from "@ngrx/store";
import {
    UNDERLYING_FX_UPDATE,
    UNDERLYING_FX_CCYPAIR_ADD,
    UNDERLYING_FX_CCYPAIR_REMOVE
} from "./underlyings-constants";

export function updateFxUnderlying(ccypair: string, bid: string,
                                   ask: string): Action {
    return {
        type: UNDERLYING_FX_UPDATE,
        payload: {ccypair, bid, ask}
    }
}

export function addFxCcypair(ccypair: string): Action {
    return {type: UNDERLYING_FX_CCYPAIR_ADD, payload: ccypair}
}

export function removeFxCcypair(ccypair: string): Action {
    return {type: UNDERLYING_FX_CCYPAIR_REMOVE, payload: ccypair}
}