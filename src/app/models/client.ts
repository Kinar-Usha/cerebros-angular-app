import { ClientIdentification } from "./client-identification";
import { Person } from "./person";
import { Preferences } from "./preferences";

export class Client {
    constructor(
        public clientId: string = '',
        public person: Person = new Person(),
        public clientIdentifications: ClientIdentification[] = [],
        public preferences: Preferences = new Preferences(),
        public password: string = '',
    ) { }
}
