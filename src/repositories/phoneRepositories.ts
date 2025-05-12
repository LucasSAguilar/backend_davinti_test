import { db } from "../connection.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import phoneInterface from "../interfaces/phoneInterface.js";

export async function findPhoneByContact(idContact: number): Promise<phoneInterface[]> {
    const [rows] = await db.query<phoneInterface[] & RowDataPacket[]>('SELECT * FROM Telefone WHERE IDCONTATO = ?', [idContact]);
    return rows;
}

export async function deletePhoneById(idPhone: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM Telefone WHERE ID = ?', [idPhone]);
    return result.affectedRows > 0;
}

export async function deletePhonesByContactId(idContact: number): Promise<number> {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM Telefone WHERE IDCONTATO = ?', [idContact]);
    return result.affectedRows;
}


export async function insertPhone(phone: phoneInterface): Promise<number> {
    
    const [result] = await db.query<ResultSetHeader>(
        'INSERT INTO Telefone (IDCONTATO, NUMERO) VALUES (?, ?)',
        [phone.idcontato, phone.numero]
    );
    return result.insertId;
}

export async function findPhoneByNumber(numero: string): Promise<phoneInterface[]> {
    const [rows] = await db.query<phoneInterface[] & RowDataPacket[]>(
        'SELECT * FROM Telefone WHERE NUMERO LIKE ?',
        [`%${numero}%`]
    );
    return rows;
}
