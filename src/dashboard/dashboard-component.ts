import { Observable, Subscriber } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app";
import {
    TickerFxComponent,
    CcyPair,
    CcyPairComponent,
    DroppableDirective,
    DraggableDirective
} from "../shared";

@Component({
    selector: "ft-dashboard",
    template: require("./dashboard-component.html"),
    directives: [DraggableDirective, DroppableDirective, TickerFxComponent, CcyPairComponent]
})
export class DashboardComponent implements OnInit {

    private ccypairs: Observable<CcyPair[]>;
    private subscriber: Subscriber<any>;


    constructor(private store: Store<AppState>) {
        this.ccypairs = this.store
            .select((s: AppState) => s.underlyings.ccypairs);

        this.subscriber = Subscriber.create((val: any) => console.log(val));
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
