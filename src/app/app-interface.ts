import {Underlyings} from "../shared";
import {Clients} from "../clients";

export interface AppState {
    underlyings: Underlyings;
    clients: Clients;
    session: any;
}
