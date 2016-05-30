import { Directive, ElementRef, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { DraggableService } from "./draggable-service";

@Directive({
    selector: "[ftDraggable]"
})
export class DraggableDirective implements OnInit {
    private el: HTMLElement;

    private dragStart: Observable<any>;
    private dragMove: Observable<any>;
    private dragEnd: Observable<any>;

    @Input("ftDraggable")
    private options: DraggableOptions;

    public static offsetToNumber(offsetValue: string): number {
        const value: string = offsetValue.replace("px", "");
        return value === "" ? 0 : parseInt(value, 10);
    }

    constructor(private element: ElementRef,
                private service: DraggableService) {
        this.el = element.nativeElement;
        this.el.classList.add("draggable");

        this.dragStart = Observable.merge(
            Observable.fromEvent(this.el, "mousedown"),
            Observable.fromEvent(this.el, "touchstart")
        );

        this.dragMove = Observable.merge(
            Observable.fromEvent(document, "mousemove"),
            Observable.fromEvent(document, "touchmove")
        );

        this.dragEnd = Observable.merge(
            Observable.fromEvent(document, "mouseup"),
            Observable.fromEvent(document, "touchend"),
            Observable.fromEvent(document, "touchcancel")
        );

    }

    public ngOnInit(): void {
        let { type, data, resetPosition }: any = this.options;
        type = type || "any";
        resetPosition = resetPosition === undefined ? true : resetPosition;

        this.dragStart
            .map(({ clientX, clientY }: any) => {
                this.el.classList.add("dragged");
                let { left, top }: any = this.el.style;
                return {
                    left: clientX,
                    top: clientY,
                    offsetLeft: DraggableDirective.offsetToNumber(left),
                    offsetTop: DraggableDirective.offsetToNumber(top)
                };
            })
            .flatMap((source: any) => this.dragMove
                .map(({ clientX, clientY }: any) => {
                    return {
                        left: clientX - source.left + source.offsetLeft,
                        top: clientY - source.top + source.offsetTop
                    };
                })
                .takeUntil(this.dragEnd.do(() => {
                    this.el.classList.remove("dragged");
                    this.service.dropped.next({ type, data });
                    if (resetPosition) {
                        this.resetPosition();
                    }
                }))
            )
            .subscribe(({ top, left }: any) => {
                this.el.style.left = left + "px";
                this.el.style.top = top + "px";
            });

    }

    private resetPosition(): void {
        this.el.style.top = "";
        this.el.style.left = "";
    }

}

export interface DraggableOptions {
    type?: string;
    data?: any;
    resetPosition?: boolean;
}
