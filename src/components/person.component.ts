import { Person } from "../models/person.model";

export const personTemplate = (person: Person) => `
<div class="person">
    <img src="${person._image}" class="image-background" />
    <div class="person-image">
        <img src="${person._image}"/>
    </div>
    <div class="person-info">
        <h2>Nombre: <span>${person._name}</span></h2>
        <h2>Apellidos: <span>${person._surname}</span></h2>
        <p>Edad: <span>21</span> años</p>
        <p>Teléfonos <span>${phonesTemplate(person._phones)}</span></p>
    </div>
    <i class="fa-solid fa-person-circle-minus remove"></i>
    <i class="fa-solid fa-user-pen edit"></i>
</div>
`;

const phonesTemplate = (phones: string[]) => {
    const template = phones.map(phone => phone);
    return template;
}