import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Input,
    Output,
    EventEmitter
} from "@angular/core";

import {FxUnderlying} from "../../underlyings";
import {SpinnerComponent} from "../spinner";

@Component({
    selector: "ft-ticker-fx",
    template: require("./ticker-fx-component.html"),
    directives: [SpinnerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerFxComponent implements OnInit {

    @Input() public fxUnderlying: FxUnderlying;

    @Output() public onRemoved = new EventEmitter();

    constructor() {}

    public ngOnInit(): any {}
    
    public remove() {
        this.onRemoved.emit(this.fxUnderlying.ccypair);
    }
    

}
