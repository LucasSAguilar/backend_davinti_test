import { db } from "../connection.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import contactInterface from "../interfaces/contactInterface.js";

export async function findAllContacts(): Promise<contactInterface[]> {
  const [rows] = await db.query<contactInterface[] & RowDataPacket[]>(
    "SELECT * FROM Contato"
  );
  return rows;
}

export async function searchContactRepositories(term: string) {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        c.id AS contatoId,
        c.nome,
        c.idade,
        t.numero
      FROM Contato c
      LEFT JOIN Telefone t ON t.idcontato = c.id
      WHERE c.nome LIKE ? OR t.numero LIKE ?
      `,
      [`%${term}%`, `%${term}%`]
    );

    const contatosMap = new Map<
      number,
      { id: number; nome: string; idade: number; numeros: string[] }
    >();

    for (const row of rows as any[]) {
      if (!contatosMap.has(row.contatoId)) {
        contatosMap.set(row.contatoId, {
          id: row.contatoId,
          nome: row.nome,
          idade: row.idade,
          numeros: [],
        });
      }
      if (row.numero) {
        contatosMap.get(row.contatoId)!.numeros.push(row.numero);
      }
    }

    return Array.from(contatosMap.values());
  } catch (error) {
    console.error("Erro ao buscar contato:", error);
    throw new Error("Erro ao buscar contato no banco de dados");
  }
}

export async function findOneContact(
  id_contact: number
): Promise<contactInterface> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT 
      c.id AS contatoId,
      c.nome,
      c.idade,
      t.id AS telefoneId,
      t.numero,
      t.idcontato
    FROM Contato c
    LEFT JOIN Telefone t ON t.idcontato = c.id
    WHERE c.id = ?
    `,
    [id_contact]
  );

  if (rows.length <= 0) {
    throw new Error("Contato não encontrado");
  }

  const contato = {
    id: rows[0].contatoId,
    nome: rows[0].nome,
    idade: rows[0].idade,
    numeros: rows
      .filter(row => row.telefoneId !== null)
      .map(row => ({
        id: row.telefoneId,
        numero: row.numero,
        idcontato: row.idcontato,
      })),
  };

  return contato;
}

export async function insertNewContact(contact: contactInterface) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO Contato (nome, idade) VALUES (?, ?)",
      [contact.nome, contact.idade]
    );

    const contatoId = result.insertId;

    for (const numero of contact.numeros) {
      await conn.query(
        "INSERT INTO Telefone (numero, idcontato) VALUES (?, ?)",
        [numero.numero, contatoId]
      );
    }

    await conn.commit();

    return {
      id: contatoId,
      nome: contact.nome,
      idade: contact.idade,
    };
  } catch (error) {
    await conn.rollback();
    console.error("Erro ao criar contato:", error);
    throw new Error("Erro ao criar o contato no banco de dados");
  } finally {
    conn.release();
  }
}

export async function putContact(contact: contactInterface, idContact: number) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query<ResultSetHeader>(
      "UPDATE Contato SET nome = ?, idade = ? WHERE id = ?",
      [contact.nome, contact.idade, idContact]
    );

    if (result.affectedRows === 0) {
      throw new Error("Contato não encontrado ou não foi alterado.");
    }

    await conn.query("DELETE FROM Telefone WHERE idcontato = ?", [idContact]);

    for (const numero of contact.numeros) {
      await conn.query(
        "INSERT INTO Telefone (numero, idcontato) VALUES (?, ?)",
        [numero.numero, idContact]
      );
    }

    await conn.commit();

    return {
      id: idContact,
      nome: contact.nome,
      idade: contact.idade,
      numeros: contact.numeros,
    };
  } catch (error) {
    await conn.rollback();
    console.error("Erro ao editar contato:", error);
    throw new Error("Erro ao editar o contato no banco de dados");
  } finally {
    conn.release();
  }
}

export async function deleteContactRepositories(id: number): Promise<boolean> {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM Contato WHERE id = ?",
    [id]
  );
  
  return result.affectedRows > 0;
}
