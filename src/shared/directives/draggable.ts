import {Directive, HostListener, ElementRef, OnInit} from "@angular/core";
import {Subject} from "rxjs";

@Directive({
    selector: "[draggable]"
})
export class Draggable implements OnInit {
    private mousedrag;
    private mouseup = new Subject();
    private mousedown = new Subject();
    private mousemove = new Subject();

    @HostListener("mouseup", ["$event"])
    onMouseup(event) {
        this.mouseup.next(event);
    }

    @HostListener("mousedown", ["$event"])
    onMousedown(event) {
        this.mousedown.next(event);
    }

    @HostListener("mousemove", ["$event"])
    onMousemove(event) {
        this.mousemove.next(event);
    }

    constructor(public element: ElementRef) {
        this.element.nativeElement.style.position = "relative";
        this.element.nativeElement.style.cursor = "pointer";

        // this.mousedrag = this.mousedown.map((event: any) => {
        //         event.preventDefault();
        //         return {
        //             left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
        //             top: event.clientY - this.element.nativeElement.getBoundingClientRect().top
        //         };
        //     })
        //     .flatMap(imageOffset => this.mousemove
        //         .map((pos: any) => ({
        //             top: pos.clientY - imageOffset.top,
        //             left: pos.clientX - imageOffset.left
        //         }))
        //         .takeUntil(this.mouseup));

        this.mousedrag = this.mousedown.map(() => {
            console.log("down");
            return {
                top: 10,
                left: 10
            }
        })

    }


    public ngOnInit() {
        this.mousedrag.subscribe((pos: any) => {
            this.element.nativeElement.style.top = pos.top + "px";
            this.element.nativeElement.style.left = pos.left + "px";
            console.log(this.element.nativeElement.style.top, this.element.nativeElement.style.left);
        });
    }

    private getElement() {
        return this.element.nativeElement.children[0];
    }


}