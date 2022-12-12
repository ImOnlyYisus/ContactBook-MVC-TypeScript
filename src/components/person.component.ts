import { stringify } from "querystring";
import { Person } from "../models/person.model";

export const personTemplate = (person: Person) => `
<div class="person" data-id='${JSON.stringify(person)}'>
    <img src="${person._image}" class="image-background" />
    <div class="person-image">
        <img src="${person._image}"/>
    </div>
    <div class="person-info">
        <h2>Nombre: <span>${person._name}</span></h2>
        <h2>Apellidos: <span>${person._surname}</span></h2>
        <p>Edad: <span>${calculateAge(person._dateOfBirth)}</span> años</p>
        <p>Teléfonos <span>${phonesTemplate(person._phones)}</span></p>
    </div>
    <i class="fa-solid fa-person-circle-minus remove" id="remove" data-id='${JSON.stringify(person)}'></i>
    <i class="fa-solid fa-user-pen edit" id="update" data-id='${JSON.stringify(person)}'></i>
</div>
`;

const phonesTemplate = (phones: string[]) => {
    const template = phones.map(phone => phone);
    return template;
}

const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}