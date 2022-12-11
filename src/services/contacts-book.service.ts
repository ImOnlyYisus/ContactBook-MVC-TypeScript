import data from '../assets/mock/contact.json';
import { IPerson } from '../interfaces/person.interface';
import { Person } from '../models/person.model';
export class ContactsBookService {
    private contacts: Person[] = [];

    constructor() {
    }

    public get _contacts() {
        return this.contacts;
    }

    public async loadContacts() {
        const data = fetch('http://localhost:3000/contacts')
        const contacts = (await data).json();
        this.mappingContact(await contacts);
    }

    private mappingContact(persons) {
        this.contacts = persons.map((person) => {
            return new Person(person.id, person.name, person.surname, person.dateOfBirth, person.phones, person.image);
        });
    }
}