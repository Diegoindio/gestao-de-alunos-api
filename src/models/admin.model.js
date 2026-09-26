import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

export function createAdmin({ nome, email, senha }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    nome,
    email,
    senha: bcrypt.hashSync(senha, 10),
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  };
}

export function sanitizeAdmin(admin) {
  if (!admin) return admin;
  const { senha, ...resto } = admin;
  return resto;
}
