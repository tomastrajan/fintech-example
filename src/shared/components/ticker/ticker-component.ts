import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Input
} from "@angular/core";

import {FxUnderlying} from "../../underlyings";

@Component({
    selector: "ft-ticker",
    template: require("./ticker-component.html"),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerComponent implements OnInit {

    @Input() public amount: FxUnderlying = { ccypair: "", ask: "", bid: ""};

    constructor() {}

    public ngOnInit(): any {}

}
