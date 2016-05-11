import {Component, ChangeDetectionStrategy, Input} from "@angular/core";

@Component({
    selector: "ft-spinner",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="spinner">
            <div class="preloader-wrapper medium active" *ngIf="predicate">
                <div class="spinner-layer">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        } 
        .spinner {
            width: 50px;
            margin-left: auto;
            margin-right: auto;
        }
    `]
})
export class SpinnerComponent {

    @Input() public predicate: any = true;

}
