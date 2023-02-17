import { ContactsBookController } from "./controllers/contacts-book.controller";
import { ContactsBookService } from "./services/contacts-book.service";
import { ContactsBookView } from "./views/contacts-book.view";

const contactsBookService = new ContactsBookService();
const contactsBookView = new ContactsBookView();

(async () => {
    await contactsBookService.loadContacts();

    new ContactsBookController(contactsBookView, contactsBookService);
})();

