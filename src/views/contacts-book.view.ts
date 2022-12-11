import { personTemplate } from "../components/person.component";
import { Person } from "../models/person.model";

export class ContactsBookView {
    private contacts = document.querySelector('#contacts');

    constructor() {
    }

    render(persons: Person[]) {
        persons.map(person => this.contacts.innerHTML += personTemplate(person));
    }
}