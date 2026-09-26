import { randomUUID } from 'node:crypto';

export function createNota({ alunoId, disciplinaId, valor, tipo, descricao }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    alunoId,
    disciplinaId,
    valor,
    tipo,
    descricao: descricao ?? null,
    createdAt: now,
    updatedAt: now,
  };
}
