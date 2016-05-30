import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class DraggableService {

    public dragged: Subject<any> = new Subject();
    public dropped: Subject<any> = new Subject();

}
