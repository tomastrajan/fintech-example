import { Observable, Subscriber } from "rxjs";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app";
import { ClientsComponent } from "../clients";
import {
    TickerFxComponent,
    CcyPair,
    CcyPairValues,
    CcyPairComponent,
    DroppableDirective,
    DraggableDirective,
    setCcypairActive
} from "../shared";

@Component({
    selector: "ft-dashboard",
    template: require("./dashboard-component.html"),
    directives: [DraggableDirective, DroppableDirective, TickerFxComponent, CcyPairComponent, ClientsComponent]
})
export class DashboardComponent {

    private ccypairs: Observable<CcyPair[]>;
    private tickers: Observable<any>;
    private onCcypairDropped: Subscriber<any>;

    constructor(private store: Store<AppState>) {
        this.ccypairs = this.store
            .select((s: AppState) => s.underlyings.ccypairs)
            .map((ccypairs: CcyPair[]) => ccypairs.filter((c: CcyPair) => !c.active));

        this.tickers = this.store
            .select((s: AppState) => s.underlyings.values)
            .flatMap((v: CcyPairValues) => {
                return this.store
                    .select((s: AppState) => s.underlyings.ccypairs)
                    .map((ccypairs: CcyPair[]) => {
                        return ccypairs
                            .filter((c: CcyPair) => c.active)
                            .map((c: CcyPair) => v[c.value]);
                    });
            });

        this.tickers.subscribe((val: any) => console.log(val));

        this.onCcypairDropped = Subscriber.create((val: any) => {
            this.store.dispatch(setCcypairActive(val.value, true));
        });
    }

    private onRemoved(cypair: string): void {
        this.store.dispatch(setCcypairActive(cypair, false));
    }

}
