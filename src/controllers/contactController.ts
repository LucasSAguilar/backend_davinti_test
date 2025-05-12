import { Request, Response } from "express";
import {
  deleteContactService,
  getAllContacts,
  getOneContact,
  isContact,
  searchContactService,
  sendNewContact,
  updateContactService,
} from "../services/contactService.js";
import contactInterface from "../interfaces/contactInterface.js";

export const listContacts = async (req: Request, res: Response) => {
  try {
    const contacts: contactInterface[] = await getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getContact = async (req: Request, res: Response) => {
  const idContact = parseInt(req.params.id);
  if (isNaN(idContact)) {
    res.status(400).json({ message: "ID Inválido" });
    return;
  }

  try {
    const contact: contactInterface = await getOneContact(idContact);
    if (!contact) {
      res.status(404).json({ message: "Contato não encontrado" });
      return;
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const searchContact = async (req: Request, res: Response) => {
  const term = req.params.term as string;
  if (!term) {
    res.status(400).json({ message: "Termo de pesquisa não fornecido" });
    return;
  }

  try {
    const contacts = await searchContactService(term);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const newContact = async (req: Request, res: Response) => {
  const contact = req.body;
  console.log(contact);
  
  if (!isContact(contact)) {
    res.status(500).json({ message: "Informações incorretas" });
    return;
  }

  try {
    const createdContact = await sendNewContact(contact);
    res.json(createdContact);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editContact = async (req: Request, res: Response) => {
  const contact = req.body;
  const idContact = parseInt(req.params.id);

  if (!isContact(contact)) {
    res.status(500).json({ message: "Informações incorretas" });
    return;
  }

  if (isNaN(idContact)) {
    res.status(400).json({ message: "ID Inválido" });
    return;
  }

  try {
    const editedContact = await updateContactService(contact, idContact);
    res.json(editedContact);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID Inválido" });
    return;
  }

  try {
    const wasDeleted = await deleteContactService(id);

    if (!wasDeleted) {
      res.status(404).json({ message: "Contato não encontrado" });
      return;
    }
    res.status(200).json({ message: "Contato deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar contato:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
