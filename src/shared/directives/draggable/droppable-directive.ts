import {Directive, ElementRef, OnInit, OnDestroy, Input} from "@angular/core";
import {Subscriber, Subscription, Observable} from "rxjs";
import {DraggableService} from "./draggable-service";

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

    constructor(
        private element: ElementRef,
        private service: DraggableService
    ) {
        this.el = element.nativeElement;
        this.mouseenter = Observable.fromEvent(this.el, "mouseenter");
        this.mouseleave = Observable.fromEvent(this.el, "mouseleave");
    }

    public ngOnInit(): void {
        this.subs.push(this.mouseenter.subscribe(() => { console.log(1); this.hovered = true }));
        this.subs.push(this.mouseleave.subscribe(() => { console.log(2); this.hovered = false }));
        this.subs.push(this.service.dropped
            .do(() => console.log(this.hovered))
            .filter(() => this.hovered)
            .filter(({type}: any) => this.options.types.indexOf(type) > -1)
            .map(({data}: any) => data)
            .subscribe(this.options.subscriber));
    }

    public ngOnDestroy(): void {
        while (this.subs.length) {
            this.subs.pop().unsubscribe();
        }
    }

}

export interface DroppableOptions {
    types: string[]
    subscriber: Subscriber<any>;
}