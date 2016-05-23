import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

import {AppState} from "../app";
import {
    TickerFxComponent,
    CcyPair,
    CcyPairComponent,
    DraggableDirective
} from "../shared";

@Component({
    selector: "ft-dashboard",
    template: require("./dashboard-component.html"),
    directives: [DraggableDirective, TickerFxComponent, CcyPairComponent]
})
export class DashboardComponent implements OnInit {

    private ccypairs: Observable<CcyPair[]>;

    constructor(private store: Store<AppState>) {
        this.ccypairs = this.store
            .select((s: AppState) => s.underlyings.ccypairs);
    }

    public ngOnInit(): any {
        console.log("ok");
    }

    // public buildTickers(ccypairs: string[]): void {
    //     this.tickers = ccypairs.map((ccypair: string) => {
    //         return this.store.select((s: AppState) => {
    //             return s.underlyings.fx.values[ccypair];
    //         });
    //     });
    // }
    //
    // public addTicker(): void {
    //     this.store.dispatch(addFxCcypair("USD/EUR"));
    // }
    //
    // public onRemoved(ccypair: string): void {
    //     this.store.dispatch(removeFxCcypair(ccypair));
    // }

}
