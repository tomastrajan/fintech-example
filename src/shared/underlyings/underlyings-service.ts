import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {AppState} from "../../app";

import {updateFxUnderlying} from "./underlyings-fx-actions";

@Injectable()
export class UnderlyingsService {
    
    constructor(private store: Store<AppState>) {
        // TODO get data from websocket
        const MOCK = [
            { ccypair: "USD/CHF", value: 0.9746 },
            { ccypair: "USD/GBP", value: 0.6919 },
            // { ccypair: "USD/EUR", value: 0.8782 },
            // { ccypair: "USD/AUD", value: 1.3642 },
            // { ccypair: "USD/CZK", value: 23.7309 },
            { ccypair: "USD/NOK", value: 8.2081 }
        ];
        Observable.interval(1000).subscribe(() => {
            const pair = MOCK[Math.floor(Math.random() * MOCK.length)];
            pair.value += (Math.random() - 0.5) / 100;
            const bid = pair.value.toFixed(4);
            const ask = (pair.value * 1.02).toFixed(4);
            store.dispatch(updateFxUnderlying(pair.ccypair, bid, ask));
        });
    }
    
}
