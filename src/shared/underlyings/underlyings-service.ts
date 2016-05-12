import {Observable, Subscription} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {AppState} from "../../app";

import {updateCcypairValue} from "./underlyings-actions";
import {CcyPair} from "./underlyings-interface";

const MOCK = [
    { ccypair: "USD/CHF", value: 0.9746 },
    { ccypair: "USD/GBP", value: 0.6919 },
    { ccypair: "USD/EUR", value: 0.8782 },
    { ccypair: "USD/AUD", value: 1.3642 }
];

@Injectable()
export class UnderlyingsService {

    private subscriptions: any = {};

    // TODO get data from websocket
    constructor(private store: Store<AppState>) {
        store.select(s => s.underlyings.ccypairs)
            .subscribe(ccypairs => {
                Object.keys(this.subscriptions)
                    .filter(key => !ccypairs.find((p: CcyPair) => p.value === key))
                    .forEach(unsubKey => {
                        this.subscriptions[unsubKey].unsubscribe();
                        delete this.subscriptions[unsubKey]
                    });

                ccypairs
                    .map((p: CcyPair) => p.value)
                    .forEach(ccypair => {
                    if (!this.subscriptions[ccypair]) {
                        const subscription = this.subscribeFxUnderlying(ccypair);
                        if (subscription) {
                            this.subscriptions[ccypair] = subscription;
                        }
                    }
                })
            });
    }

    public subscribeFxUnderlying(ccypair: string): Subscription {
        const pair = MOCK.find(i => i.ccypair === ccypair);
        if (pair) {
            return Observable.interval(1000).subscribe(() => {
                (<any>pair).value += (Math.random() - 0.5) / 100;
                const bid = pair.value.toFixed(4);
                const ask = (pair.value * 1.02).toFixed(4);
                this.store.dispatch(updateCcypairValue(pair.ccypair, bid, ask));
            });
        }
        return null;
    }
    
}
