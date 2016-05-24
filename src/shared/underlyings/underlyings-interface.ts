export interface Underlyings {
    ccypairs: CcyPair[];
    values: CcyPairValues;
}

export interface CcyPair {
    value: string;
    active: boolean;
    favourite?: boolean;
}

export interface CcyPairValues {
    [ccypair: string]: CcyPairValue;
}

export interface CcyPairValue {
    ccypair: string;
    bid: string;
    ask: string;
}
