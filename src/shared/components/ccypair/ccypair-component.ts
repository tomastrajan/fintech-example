import { Component, ChangeDetectionStrategy, Input, OnChanges } from "@angular/core";
import { CcyPair } from "../../underlyings/underlyings-interface";

@Component({
    selector: "ft-ccypair",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <span class="ccypair">{{ccy1}} <span>/</span> {{ccy2}}</span>
    `
})
export class CcyPairComponent implements OnChanges {

    @Input()
    private ccypair: CcyPair;

    private ccy1: string;
    private ccy2: string;

    public ngOnChanges(changes: {}): any {
        if (this.ccypair) {
            [this.ccy1, this.ccy2] = this.ccypair.value.split("/");
        }
    }

}
