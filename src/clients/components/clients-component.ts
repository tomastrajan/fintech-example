import { Component, OnInit } from "@angular/core";
import { COMMON_DIRECTIVES, Control } from "@angular/common";
import { ClientService } from "../clients-service";
import { Client } from "../clients-interface";
import { DraggableDirective } from "../../shared/directives/draggable/draggable-directive";

@Component({
    selector: "ft-clients",
    template: require("./clients-component.html"),
    directives: [COMMON_DIRECTIVES, DraggableDirective],
    providers: [ClientService]
})
export class ClientsComponent implements OnInit {

    clientsDefault: Client[];
    clientsSearchResults: Client[];

    query = new Control();

    constructor(private clientService: ClientService) {
    }

    ngOnInit(): any {
        this.clientService.clientsDefault$.subscribe(v => this.clientsDefault = v);
        this.clientService.clientsSearchResults$
            .subscribe(c => this.clientsSearchResults = c);

        this.clientService.initDefaultClients();

        this.query.valueChanges
            .debounceTime(300)
            .subscribe(q => this.clientService.searchClients(q));
    }

    toggleFavourite(client: Client) {
        this.clientService.toggleFavourite(client);
    }

}
