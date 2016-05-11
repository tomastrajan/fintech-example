export interface Underlyings {
    fx: FxState
}

export interface FxState {
    ccypairs: string[];
    values: {
        [ccypair: string]: FxUnderlying;
    }
}

export interface FxUnderlying {
    ccypair: string;
    bid: string;
    ask: string;
}