import { personTemplate } from "../components/person.component";
import { Person } from "../models/person.model";
import Swal from 'sweetalert2'

export class ContactsBookView {
    private contacts = document.querySelector('#contacts');

    private insertDiv = document.querySelector('#insertForm');
    private updateDiv = document.querySelector('#updateForm');
    private insert: IForms = {
        name: document.querySelector("#nameInsert"),
        surname: document.querySelector("#surnameInsert"),
        dateOfBirth: document.querySelector("#dateInsert"),
        phones: document.querySelector("#phoneInsert"),
        image: document.querySelector("#imageInsert"),

    }

    private update: IForms = {
        name: document.querySelector("#nameUpdate"),
        surname: document.querySelector("#surnameUpdate"),
        dateOfBirth: document.querySelector("#dateUpdate"),
        phones: document.querySelector("#phoneUpdate"),
        image: document.querySelector("#imageUpdate"),

    }

    private buttons: IButtons = {
        insertBtn: document.querySelector("#insertBtn"),
        updateBtn: document.querySelector("#updateBtn")
    }

    constructor() {
    }

    render(persons: Person[]) {
        this.contacts.innerHTML = "";
        persons.forEach(person => this.contacts.innerHTML += personTemplate(person));
    }

    bindAdd(addContact) {
        this.buttons.insertBtn.addEventListener("click", () => {
            const { name, surname, dateOfBirth, phones, image } = this.insert;
            const newPerson = {
                name: name.value,
                surname: surname.value,
                dateOfBirth: dateOfBirth.value,
                phones: phones.value,
                image: image.value
            };
            addContact(newPerson);

            this.insert.name.value = "";
            this.insert.surname.value = "";
            this.insert.dateOfBirth.value = "";
            this.insert.phones.value = "";
            this.insert.image.value = "";
        })
    }

    bindDelete(deleteContact) {
        const deletesButtons: NodeListOf<HTMLElement> = document.querySelectorAll('#remove');
        for (const deleteButton of deletesButtons) {
            deleteButton.addEventListener("click", (event) => {
                const contact = JSON.parse(deleteButton.dataset.id);

                this.deleteAlert(deleteContact, contact);


            })
        }
    }

    bindIconUpdate() {
        const updateButtons: NodeListOf<HTMLElement> = document.querySelectorAll('#update');
        for (const updateButton of updateButtons) {
            updateButton.addEventListener("click", (event) => {
                this.insertDiv.classList.add("disabled");
                this.updateDiv.classList.remove("disabled");

                const contact = JSON.parse(updateButton.dataset.id);
                this.update.name.value = contact.name;
                this.update.surname.value = contact.surname;
                this.update.dateOfBirth.value = contact.dateOfBirth;
                this.update.phones.value = contact.phones;
                this.update.image.value = contact.image;

                console.log(this.update);

                this.buttons.updateBtn.dataset.id = contact.id;
            })
        }
    }

    bindUpdate(updateContact) {
        this.buttons.updateBtn.addEventListener("click", () => {
            const { name, surname, dateOfBirth, phones, image } = this.update;
            const id = this.buttons.updateBtn.dataset.id;
            const updatePerson = {
                id: id,
                name: name.value,
                surname: surname.value,
                dateOfBirth: dateOfBirth.value,
                phones: phones.value,
                image: image.value
            };
            updateContact(updatePerson);
            this.blockUpdate();
        })
    }

    blockUpdate() {
        this.insertDiv.classList.remove("disabled");
        this.updateDiv.classList.add("disabled");
        this.update.name.value = "";
        this.update.surname.value = "";
        this.update.dateOfBirth.value = "";
        this.update.phones.value = "";
        this.update.image.value = "";
    }

    deleteAlert(deleteContact, contact) {
        Swal.fire({
            title: `¿Estas seguro que quieres borrar a ${contact.name} ${contact.surname}?`,
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Se ha borrado!',
                    `El contacto ${contact.name} ${contact.surname}.`,
                    'success',
                );
                deleteContact(contact);
            }
        })
    }

}

interface IForms {
    name: HTMLInputElement,
    surname: HTMLInputElement,
    dateOfBirth: HTMLInputElement,
    phones: HTMLInputElement,
    image: HTMLInputElement,
}

interface IButtons {
    insertBtn: HTMLSpanElement,
    updateBtn: HTMLSpanElement,
}