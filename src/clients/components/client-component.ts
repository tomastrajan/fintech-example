import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Client } from "../clients-interface";

@Component({
    selector: "ft-client",
    template: require("./client-component.html")
})
export class ClientComponent {

    @Input() client: Client;
    @Output() toggleFavourite = new EventEmitter<Client>();

    onFavouriteClick() {
        this.toggleFavourite.emit(this.client);
    }

}
