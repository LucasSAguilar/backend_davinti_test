import contactInterface from "../interfaces/contactInterface.js";
import { logDeletion } from "../logsService/logService.js";
import {
  deleteContactRepositories,
  findAllContacts,
  findOneContact,
  insertNewContact,
  putContact,
  searchContactRepositories,
} from "../repositories/contactRepositories.js";

export async function getAllContacts() {
  return await findAllContacts();
}

export async function getOneContact(
  id_contact: number
): Promise<contactInterface> {
  return await findOneContact(id_contact);
}

export async function searchContactService(term: string) {
  return await searchContactRepositories(term);
}

export function isContact(data: any) {
  return typeof data.nome === "string" && typeof data.idade === "number";
}

export async function sendNewContact(contact: contactInterface) {
  return await insertNewContact(contact);
}

export async function updateContactService(
  contact: contactInterface,
  id: number
) {
  return await putContact(contact, id);
}

export async function deleteContactService(id: number) {
  const contact = await findOneContact(id);

  if (!contact) return false;
  const wasDeleted = await deleteContactRepositories(id);
  if (wasDeleted) {
    logDeletion(id, contact.nome);
  }
  return wasDeleted;
}
