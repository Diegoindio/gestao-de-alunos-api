import { randomUUID } from 'node:crypto';

export function createTrabalho({ alunoId, disciplinaId, titulo, descricao }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    alunoId,
    disciplinaId,
    titulo,
    descricao: descricao ?? null,
    status: 'entregue',
    nota: null,
    feedback: null,
    dataEntrega: now,
    createdAt: now,
    updatedAt: now,
  };
}
