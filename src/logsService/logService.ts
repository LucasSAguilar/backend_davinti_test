import fs from 'fs';
import path from 'path';

const logPath = path.resolve('logs', 'deletions.log');

fs.mkdirSync(path.dirname(logPath), { recursive: true });

export function logDeletion(contactId: number, contactName: string) {
  const logMessage = `[${new Date().toISOString()}] Contato ID ${contactId} (${contactName}) excluído\n`;

  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error('Erro ao escrever no log de exclusão:', err);
    }
  });
}
