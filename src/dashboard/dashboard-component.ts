import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {TickerFxComponent} from "../shared";
import {AppState} from "../app";
import {
    removeFxCcypair,
    addFxCcypair
} from "../shared/underlyings/underlyings-fx-actions";

@Component({
    selector: "ft-dashboard",
    template: require("./dashboard-component.html"),
    directives: [TickerFxComponent]
})
export class DashboardComponent implements OnInit {

    private tickers: Observable<any>[];

    constructor(private store: Store<AppState>) {
    }

    public ngOnInit(): any {
        this.store.select((s: AppState) => s.underlyings.fx.ccypairs)
            .subscribe((ccypairs: string[]) => this.buildTickers(ccypairs));
    }

    public buildTickers(ccypairs: string[]): void {
        this.tickers = ccypairs.map((ccypair: string) => {
            return this.store.select((s: AppState) => {
                return s.underlyings.fx.values[ccypair];
            });
        });
    }

    public addTicker(): void {
        this.store.dispatch(addFxCcypair("USD/EUR"));
    }

    public onRemoved(ccypair: string): void {
        this.store.dispatch(removeFxCcypair(ccypair));
    }

}
