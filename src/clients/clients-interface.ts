export interface Clients {
    clients: Client[];
}

export interface Client {
    id: string;
    name: string;
    surname: string;
    accounts: Account[];
}

export interface Account {
    currency: string;
    amount: string;
}
