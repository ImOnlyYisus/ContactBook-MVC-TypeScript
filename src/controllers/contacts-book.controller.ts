import { Person } from "../models/person.model";
import { ContactsBookService } from "../services/contacts-book.service";
import { ContactsBookView } from "../views/contacts-book.view";

export class ContactsBookController {

    constructor(private readonly contactsBookView: ContactsBookView, private readonly contactsBookService: ContactsBookService) {
        this.onLoadContacts(this.contactsBookService._contacts);
    }

    private onLoadContacts = (persons: Person[]) => {
        this.contactsBookView.render(persons);
    }
}