import { Request, Response } from "express";
import { 
    getPhoneByNumber, 
    getPhoneByContactId, 
    removePhoneById, 
    removePhonesByContactId, 
    addPhone, 
    isPhone
} from "../services/phoneService.js";
import phoneInterface from "../interfaces/phoneInterface.js";

export const searchPhoneByNumber = async (req: Request, res: Response) => {
    const { numero } = req.params;
    try {
        const phones = await getPhoneByNumber(numero);
        if (phones) {
            res.json(phones);
        } else {
            res.status(404).json({ message: "Telefone não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const searchPhoneByContactId = async (req: Request, res: Response) => {
    const idContact = parseInt(req.params.id);
    if (isNaN(idContact)) {
        res.status(400).json({ message: "ID de contato inválido" });
        return;
    }

    try {
        const phones = await getPhoneByContactId(idContact);
        if (phones) {
            res.json(phones);
        } else {
            res.status(404).json({ message: "Nenhum telefone encontrado para este contato" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deletePhoneById = async (req: Request, res: Response) => {
    const idPhone = parseInt(req.params.id);
    if (isNaN(idPhone)) {
        res.status(400).json({ message: "ID de telefone inválido" });
        return;
    }

    try {
        const wasDeleted = await removePhoneById(idPhone);
        if (wasDeleted) {
            res.status(200).json({ message: "Telefone deletado com sucesso" });
        } else {
            res.status(404).json({ message: "Telefone não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deletePhonesByContactId = async (req: Request, res: Response) => {
    const idContact = parseInt(req.params.id);
    if (isNaN(idContact)) {
        res.status(400).json({ message: "ID de contato inválido" });
        return;
    }

    try {
        const phonesDeleted = await removePhonesByContactId(idContact);
        if (phonesDeleted > 0) {
            res.status(200).json({ message: `${phonesDeleted} telefone(s) deletado(s) com sucesso` });
        } else {
            res.status(404).json({ message: "Nenhum telefone encontrado para este contato" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const addNewPhone = async (req: Request, res: Response) => {
    const phone = req.body;
    
    if (!isPhone(phone)) {
        res.status(400).json({ message: "Dados incompletos para o telefone" });
        return;
    }

    try {
        const newPhoneId = await addPhone(phone);
        res.status(201).json({ message: "Telefone adicionado com sucesso", id: newPhoneId });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
