import {Client} from "./clients-interface";

export const CLIENT_ADD: string = "CLIENT_ADD";
export const CLIENT_UPDATE: string = "CLIENT_UPDATE";
export const CLIENT_REMOVE: string = "CLIENT_REMOVE";

export const MOCK_CLIENTS: Client[] = [
    {id: "1", name: "Peter", surname: "Smith", accounts: []},
    {id: "2", name: "John", surname: "Barber", accounts: []},
    {id: "3", name: "David", surname: "Taylor", accounts: []},
    {id: "4", name: "Oliver", surname: "Hammer", accounts: []}
];
