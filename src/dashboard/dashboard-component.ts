import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

import {TickerComponent} from "../shared";
import {AppState} from "../app";

@Component({
    selector: "ft-dashboard",
    template: require("./dashboard-component.html"),
    directives: [TickerComponent]
})
export class DashboardComponent implements OnInit {

    private usdeur: Observable<any>;

    constructor(private store: Store<AppState>) {}

    public ngOnInit(): any {
        this.usdeur = this.store.select((s: AppState) => {
            return s.underlyings.fx["USD/EUR"];
        });
    }

}
