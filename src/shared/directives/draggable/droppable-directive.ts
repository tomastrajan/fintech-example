import { Directive, ElementRef, OnInit, Input } from "@angular/core";
import { Subscriber } from "rxjs";
import { DraggableService } from "./draggable-service";

@Directive({
    selector: "[ftDroppable]"
})
export class DroppableDirective implements OnInit {

    private el: HTMLElement;
    private hover: boolean;

    @Input("ftDroppable")
    private options: DroppableOptions;

    constructor(private element: ElementRef,
                private service: DraggableService) {
        this.el = element.nativeElement;
        this.el.classList.add("droppable");
    }

    public ngOnInit(): void {
        this.service.dragged
            .map(({ clientX, clientY }: any) => this.isHover(clientX, clientY))
            .subscribe((hover: boolean) => {
                this.hover = hover;
                this.el.classList[hover ? "add" : "remove"]("hovered");
            });
        this.service.dropped
            .filter(() => this.hover)
            .filter(({ type }: any) => this.options.types.indexOf(type) > -1)
            .map(({ data }: any) => data)
            .subscribe(this.options.onDropped);
    }

    private isHover(x: number, y: number): boolean {
        return x >= this.el.offsetLeft &&
            x <= this.el.offsetLeft + this.el.offsetWidth &&
            y >= this.el.offsetTop &&
            y <= this.el.offsetTop + this.el.offsetHeight;
    }


}

export interface DroppableOptions {
    types: string[];
    onDropped: Subscriber<any>;
}
