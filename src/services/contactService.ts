import contactInterface from "../interfaces/contactInterface.js";
import { deleteContactRepositories, findAllContacts, findOneContact, insertNewContact, putContact } from "../repositories/contactRepositories.js";

export async function getAllContacts() {
    return await findAllContacts();
}

export async function getOneContact(id_contact: number) {
    return await findOneContact(id_contact)
}

export function isContact(data: any) {
    return (
        typeof data.nome === 'string' &&
        typeof data.idade === 'number'
    )
}

export async function sendNewContact(contact: contactInterface) {
    return await insertNewContact(contact);
}

export async function updateContactService(contact: contactInterface, id: number) {
    return await putContact(contact, id)
}

export async function deleteContactService(id: number){
    return await deleteContactRepositories(id)
}