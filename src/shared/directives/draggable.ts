import {Directive, ElementRef, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs";

@Directive({
    selector: "[draggable]",
    properties: []
})
export class Draggable implements OnInit {
    private mousedown;
    private mousemove;
    private mouseup;
    private el;

    @Input() private draggable: string;
    @Input() private draggableData: any;
    @Input() private draggableOptions: DraggableOptions;

    constructor(public element: ElementRef) {
        this.el = element.nativeElement;

        this.mousedown = Observable.fromEvent(this.el, "mousedown");
        this.mousemove = Observable.fromEvent(document, "mousemove");
        this.mouseup = Observable.fromEvent(document, "mouseup");
    }

    public ngOnInit() {
        this.mousedown
            .map(({clientX, clientY}: any) => {
                event.preventDefault();
                this.el.classList.add("dragged");
                let {left, top} = this.el.style;
                return {
                    left: clientX,
                    top: clientY,
                    offsetLeft: Draggable.offsetToNumber(left),
                    offsetTop: Draggable.offsetToNumber(top)
                };
            })
            .flatMap((source: any) => this.mousemove
                .map(({clientX, clientY}: any) => {
                    return {
                        left: clientX - source.left + source.offsetLeft,
                        top: clientY - source.top + source.offsetTop
                    }
                })
                .takeUntil(this.mouseup.do(() => {
                    this.el.classList.remove("dragged");

                    if (this.draggableOptions.resetPosition) {
                        this.resetPosition();
                    }
                }))
            )
            .catch(err => {
                console.log(err);
            })
            .subscribe(({top, left}: any) => {
                this.el.style.left = left + "px";
                this.el.style.top = top + "px";
            })

    }

    private resetPosition() {
        this.el.style.top = "";
        this.el.style.left = "";
    }

    static offsetToNumber(offset) {
        const value = offset.replace("px", "");
        return value === "" ? 0 : parseInt(value, 10);
    }

}

export interface DraggableOptions {
    resetPosition?: boolean;
}