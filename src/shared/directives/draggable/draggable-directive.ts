import {Directive, ElementRef, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs";
import {DraggableService} from "./draggable-service";

@Directive({
    selector: "[ftDraggable]"
})
export class DraggableDirective implements OnInit {
    private el: HTMLElement;
    private mousedown;
    private mousemove;
    private mouseup;

    @Input("ftDraggable") private options: DraggableOptions;

    constructor(
        private element: ElementRef, 
        private service: DraggableService
    ) {
        this.el = element.nativeElement;
        this.el.classList.add("draggable");

        this.mousedown = Observable.fromEvent(this.el, "mousedown");
        this.mousemove = Observable.fromEvent(document, "mousemove");
        this.mouseup = Observable.fromEvent(document, "mouseup");
    }

    public ngOnInit() {
        let {type, data, resetPosition} = this.options;
        type = type || "any";
        resetPosition = resetPosition === undefined ? true : resetPosition;

        this.mousedown
            .map(({clientX, clientY}: any) => {
                this.el.classList.add("dragged");
                let {left, top} = this.el.style;
                return {
                    left: clientX,
                    top: clientY,
                    offsetLeft: DraggableDirective.offsetToNumber(left),
                    offsetTop: DraggableDirective.offsetToNumber(top)
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
                    this.service.dropped.next({ type, data });
                    if (resetPosition) {
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
    type?: string;
    data?: any;
    resetPosition?: boolean;
}