import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { SpinnerComponent } from "../spinner";

@Component({
    selector: "ft-ticker-fx",
    template: require("./ticker-fx-component.html"),
    directives: [SpinnerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickerFxComponent {

    @Input() public fxUnderlying: any;

    @Output() public onRemoved: EventEmitter<any> = new EventEmitter();

    public remove(): void {
        this.onRemoved.emit(this.fxUnderlying.ccypair);
    }

}
