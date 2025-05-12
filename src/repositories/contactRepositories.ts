import { db } from "../connection.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import contactInterface from "../interfaces/contactInterface.js";

export async function findAllContacts(): Promise<contactInterface[]> {
    const [rows] = await db.query<contactInterface[] & RowDataPacket[]>('SELECT * FROM Contato');
    return rows
}


export async function findOneContact(id_contact: number): Promise<contactInterface> {
    const [rows] = await db.query<contactInterface[] & RowDataPacket[]>('SELECT * FROM Contato WHERE id = ?', [id_contact]);
    return rows[0] || null;
}


export async function insertNewContact(contact: contactInterface) {
    try {
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO Contato (nome, idade) VALUES (?, ?)', 
            [contact.nome, contact.idade]
        );
        
        return {
            id: result.insertId,
            nome: contact.nome,
            email: contact.idade,
        };
    } catch (error) {
        console.error("Erro ao criar contato:", error);
        throw new Error("Erro ao criar o contato no banco de dados");
    }
}

export async function putContact(contact: contactInterface, idContact: number) {
    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE Contato SET nome = ?, idade = ? WHERE id = ?',
            [contact.nome, contact.idade, idContact]
        );

        if (result.affectedRows === 0) {
            throw new Error("Contato não encontrado ou não foi alterado.");
        }

        return {
            id: idContact,
            nome: contact.nome,
            idade: contact.idade
        };
    } catch (error) {
        console.error("Erro ao editar contato:", error);
        throw new Error("Erro ao editar o contato no banco de dados");
    }
}

export async function deleteContactRepositories(id: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
        "DELETE FROM Contato WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
}