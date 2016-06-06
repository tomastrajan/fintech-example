import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Client } from "./clients-interface";

@Injectable()
export class ClientService {

    clientsModel: Client[];

    clientsDefault$: Subject<Client[]> = new Subject<Client[]>();
    clientsSearchResults$: Subject<Client[]> = new Subject<Client[]>();

    static generateMockData(): Client[] {
        const names = [
            "John", "Mark", "Peter", "Julius", "Fabian", "Tomas", "Dani", "Dante",
            "Angelo", "Lukas", "Todd", "Mario", "Martin", "Viktor"
        ];
        const surnames = ["Grau", "Braun", "Schwartz", "Gelb", "Blau", "Rot", "Weiss"];
        const result: Client[] = [];
        for (let i = 0; i < 50; i++) {
            const client: Client = {
                id: i,
                popular: Math.random() < 0.05,
                favourite: Math.random() < 0.1,
                name: names[Math.floor(Math.random() * names.length)],
                surname: surnames[Math.floor(Math.random() * surnames.length)]
            };
            result.push(client);
        }
        let index = 0;
        result.forEach(c => {
            if (c.favourite || c.popular) {
                c.index = index++;
            }
        });
        return result;
    }

    constructor() {
        this.clientsModel = ClientService.generateMockData();
    }

    initDefaultClients(): void {
        this.clientsDefault$.next(this.getDefaultClients());
    }

    toggleFavourite(client: Client) {
        const foundClient = this.clientsModel.find(c => c.id === client.id);
        foundClient.favourite = !foundClient.favourite;
        this.clientsDefault$.next(this.getDefaultClients());
    }

    searchClients(query: string): void {
        const tokens = query.split(" ").filter(t => t).map(t => t.toLowerCase());
        this.clientsSearchResults$.next(
            this.clientsModel
                .filter(c => {
                    if (tokens[1]) {
                        return c.name.toLowerCase().indexOf(tokens[0]) > -1 &&
                            c.surname.toLowerCase().indexOf(tokens[1]) > -1;
                    } else {
                        return c.name.toLowerCase().indexOf(tokens[0]) > -1;
                    }
                })
                .slice(0, 10)
        );
    }

    private getDefaultClients(): Client[] {
        return this.clientsModel
            .filter(c => c.popular || c.favourite)
            .sort((a, b) => {
                const byPopular = a.popular ? -1 : b.popular ? 1 : 0;
                const byIndex = a.index && b.index ? a.index - b.index : a.index ? 1 : -1;
                return byPopular === 0 ? byIndex : byPopular;
            });
    }

}
