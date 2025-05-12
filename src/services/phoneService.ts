
import phoneInterface from "../interfaces/phoneInterface.js";
import { deletePhoneById, deletePhonesByContactId, findPhoneByContact, findPhoneByNumber, insertPhone } from "../repositories/phoneRepositories.js";

export const getPhoneByNumber = async (numero: string): Promise<phoneInterface[]> => {
    try {
        return await findPhoneByNumber(numero);
    } catch (error) {
        throw new Error("Erro ao buscar telefone pelo número.");
    }
}

export const getPhoneByContactId = async (idContact: number): Promise<phoneInterface[]> => {
    try {
        return await findPhoneByContact(idContact);
    } catch (error) {
        throw new Error("Erro ao buscar telefone pelo ID do contato.");
    }
}

export const removePhoneById = async (idPhone: number): Promise<boolean> => {
    try {
        return await deletePhoneById(idPhone);
    } catch (error) {
        throw new Error("Erro ao deletar telefone pelo ID.");
    }
}

export const removePhonesByContactId = async (idContact: number): Promise<number> => {
    try {
        return await deletePhonesByContactId(idContact);
    } catch (error) {
        throw new Error("Erro ao deletar telefone(s) pelo ID do contato.");
    }
}

export const addPhone = async (phone: phoneInterface): Promise<number> => {
    try {
        return await insertPhone(phone);
    } catch (error) {
        throw new Error("Erro ao inserir novo telefone.");
    }
}

export function isPhone(data: any) {
    return (
        typeof data.idcontato === 'number' &&
        typeof data.numero === 'string'
    )
}
