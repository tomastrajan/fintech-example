import { Component, Input } from "@angular/core";
import { Client } from "../clients-interface";

@Component({
    selector: "ft-client-list",
    template: require("./clients-list-component.html")
})
export class ClientListComponent {

    @Input() public clients: Client[] = [];

}
