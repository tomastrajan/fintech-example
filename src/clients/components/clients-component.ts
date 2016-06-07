import { Component, OnInit } from "@angular/core";
import { COMMON_DIRECTIVES, Control } from "@angular/common";
import { DraggableDirective } from "../../shared";
import { ClientService } from "../clients-service";
import { Client } from "../clients-interface";

@Component({
    selector: "ft-clients",
    template: require("./clients-component.html"),
    directives: [COMMON_DIRECTIVES, DraggableDirective]
})
export class ClientsComponent implements OnInit {

    query: Control = new Control();

    constructor(private clientService: ClientService) {}

    ngOnInit(): any {
        this.clientService.initDefaultClients();

        this.query.valueChanges
            .debounceTime(300)
            .subscribe(q => this.clientService.searchClients(q));
    }

    toggleFavourite(client: Client) {
        this.clientService.toggleFavourite(client);
    }

}
