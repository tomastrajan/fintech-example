import { Directive, ElementRef, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscriber, Subscription, Observable } from "rxjs";
import { DraggableService } from "./draggable-service";

@Directive({
    selector: "[ftDroppable]"
})
export class DroppableDirective implements OnInit, OnDestroy {

    private el: HTMLElement;
    private subs: Subscription[] = [];
    private mouseenter: Observable<any>;
    private mouseleave: Observable<any>;
    private hovered: boolean;

    @Input("ftDroppable") private options: DroppableOptions;

    constructor(private element: ElementRef,
                private service: DraggableService) {
        this.el = element.nativeElement;
        this.el.classList.add("droppable");

        this.mouseenter = Observable.fromEvent(this.el, "mouseenter");
        this.mouseleave = Observable.fromEvent(this.el, "mouseleave");
    }

    public ngOnInit(): void {
        this.subs.push(this.mouseenter.subscribe(() => {
            this.hovered = true;
            this.el.classList.add("hovered");
        }));
        this.subs.push(this.mouseleave.subscribe(() => {
            this.hovered = false;
            this.el.classList.remove("hovered");
        }));
        this.subs.push(this.service.dropped
            .filter(() => this.hovered)
            .filter(({ type }: any) => this.options.types.indexOf(type) > -1)
            .map(({ data }: any) => data)
            .subscribe(this.options.onDropped));
    }

    public ngOnDestroy(): void {
        while (this.subs.length) {
            this.subs.pop().unsubscribe();
        }
    }

}

export interface DroppableOptions {
    types: string[];
    onDropped: Subscriber<any>;
}
