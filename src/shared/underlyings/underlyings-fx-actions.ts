import {Action} from "@ngrx/store";

import {UNDERLYING_FX_UPDATE} from "./underlyings-constants";

export function updateFxUnderlying(ccypair: string, bid: string, 
                                   ask: string): Action {
    return {
        type: UNDERLYING_FX_UPDATE,
        payload: { ccypair, bid, ask }
    }
}