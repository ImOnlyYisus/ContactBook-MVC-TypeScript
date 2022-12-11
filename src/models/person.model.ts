export class Person {
    private id: number;
    private name: string;
    private surname: string;
    private dateOfBirth: Date;
    private phones: string[];
    private image: string;

    constructor(id: number, name: string, surname: string, dateOfBirth: Date, phones: string[], image: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.phones = phones;
        this.image = image;
    }

    public get _id() {
        return this.id;
    }

    public get _name() {
        return this.name;
    }

    public get _surname() {
        return this.surname;
    }

    public get _dateOfBirth() {
        return this.dateOfBirth;
    }

    public get _phones() {
        return this.phones;
    }

    public get _image() {
        return this.image;
    }


}