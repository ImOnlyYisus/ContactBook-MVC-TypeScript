import { Person } from "../models/person.model";
import { ContactsBookService } from "../services/contacts-book.service";
import { ContactsBookView } from "../views/contacts-book.view";

export class ContactsBookController {

    constructor(private readonly contactsBookView: ContactsBookView, private readonly contactsBookService: ContactsBookService) {
        this.renderContact();
        this.contactsBookView.bindAdd(this.handlerAdd);
        this.contactsBookView.bindUpdate(this.handlerUpdate);
    }

    private handlerAdd = (addContact) => {
        this.contactsBookService.add(addContact);
        this.renderContact();
    }
    private handlerDelete = (deleteContact) => {
        this.contactsBookService.delete(deleteContact);
        this.renderContact();
    }

    private handlerUpdate = (updateContact) => {
        this.contactsBookService.update(updateContact);
        this.renderContact();
    }

    private renderContact = () => {
        this.contactsBookView.render(this.contactsBookService._contacts);
        this.contactsBookView.bindDelete(this.handlerDelete);
        this.contactsBookView.bindIconUpdate();
    }
}