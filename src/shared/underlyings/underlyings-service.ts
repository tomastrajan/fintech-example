import { Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app";
import { updateCcypairValue } from "./underlyings-actions";
import { CcyPair } from "./underlyings-interface";

const MOCK: any = [
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
        store.select((s: AppState) => s.underlyings.ccypairs)
            .subscribe((ccypairs: CcyPair[]) => {
                Object.keys(this.subscriptions)
                    .filter((key: string) => !ccypairs.find((p: CcyPair) => p.value === key))
                    .forEach((unsubKey: string) => {
                        this.subscriptions[unsubKey].unsubscribe();
                        delete this.subscriptions[unsubKey];
                    });

                ccypairs
                    .map((p: CcyPair) => p.value)
                    .forEach((ccypair: string) => {
                        if (!this.subscriptions[ccypair]) {
                            const subscription: Subscription = this.subscribeFxUnderlying(ccypair);
                            if (subscription) {
                                this.subscriptions[ccypair] = subscription;
                            }
                        }
                    });
            });
    }

    public subscribeFxUnderlying(ccypair: string): Subscription {
        const pair: any = MOCK.find((i: any) => i.ccypair === ccypair);
        if (pair) {
            return Observable.interval(1000).subscribe(() => {
                (<any>pair).value += (Math.random() - 0.5) / 100;
                const bid: string = pair.value.toFixed(4);
                const ask: string = (pair.value * 1.02).toFixed(4);
                this.store.dispatch(updateCcypairValue(pair.ccypair, bid, ask));
            });
        }
        return undefined;
    }

}
