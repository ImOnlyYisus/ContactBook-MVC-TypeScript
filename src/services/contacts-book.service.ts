import { Person } from '../models/person.model';
import { v4 as uuidv4 } from 'uuid';

type uuid = string;
export class ContactsBookService {
    //private contacts: Person[] = [];
    private contacts: Map<uuid, Person> = new Map<uuid, Person>();

    constructor() {
    }

    public get _contacts() {
        return Array.from(this.contacts.values());
    }

    public async loadContacts() {
        const data = fetch('http://localhost:3000/contacts')
        const contacts = (await data).json();
        this.mappingContact(await contacts);
    }

    private mappingContact(persons) {
        const newPersons = persons.map((person) => {
            return new Person(person.id, person.name, person.surname, person.dateOfBirth, person.phones, person.image);
        });

        for (const newPerson of newPersons) {
            this.contacts.set(newPerson._id, newPerson);
        }
    }

    public add = (person) => {
        const { name, surname, dateOfBirth, phones, image } = person;
        const phoneSplited = phones.split(',');

        const newPerson = new Person(uuidv4(), name, surname, dateOfBirth, phoneSplited, image)

        this.contacts.set(newPerson._id, newPerson);
        this.fetchAdd(newPerson);

    }

    public async fetchAdd(person) {
        fetch('http://localhost:3000/contacts', {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public delete = (person) => {
        this.contacts.delete(person.id);
        this.fetchDelete(person);
    }

    public async fetchDelete(person) {
        fetch(`http://localhost:3000/contacts/${person.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public update = (person) => {
        const { name, surname, dateOfBirth, phones, image } = person;
        const phoneSplited = phones.split(',');

        const newPerson = new Person(person.id, name, surname, dateOfBirth, phoneSplited, image)

        this.contacts.set(newPerson._id, newPerson);
        this.fetchUpdate(newPerson);
    }

    public async fetchUpdate(person) {
        fetch(`http://localhost:3000/contacts/${person.id}`, {
            method: 'PUT',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}