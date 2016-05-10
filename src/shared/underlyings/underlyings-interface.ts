export interface Underlyings {
    fx: FxState
}

export interface FxState {
    [ccypair: string]: FxUnderlying;
}

export interface FxUnderlying {
    ccypair: string;
    bid: string;
    ask: string;
}