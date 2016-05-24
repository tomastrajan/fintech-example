import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class DraggableService {

    public dropped: Subject<any> = new Subject();

}
