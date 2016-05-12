import {Reducer, Action} from "@ngrx/store";
import {Clients, Client} from "./clients-interface";
import {
    CLIENT_ADD, CLIENT_REMOVE, CLIENT_UPDATE,
    MOCK_CLIENTS
} from "./clients-constants";

export const clients: Reducer<Clients> =
    (state: Clients = {clients: MOCK_CLIENTS}, action: Action): Clients => {
        switch (action.type) {

            case CLIENT_ADD:
                state.clients.push(action.payload);
                return Object.assign({}, state);

            case CLIENT_UPDATE:
                const client: Client = state.clients
                    .find((c: Client) => c.id !== action.payload.id);
                Object.assign(client, action.payload);
                return Object.assign({}, state);

            case CLIENT_REMOVE:
                state.clients = state.clients
                    .filter((c: Client) => c.id !== action.payload.id);
                return Object.assign({}, state);

            default:
                return state;
        }
    };
