import { randomUUID } from 'node:crypto';

export function createDisciplina({ nome, codigo, cargaHoraria }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    nome,
    codigo,
    cargaHoraria: cargaHoraria ?? null,
    createdAt: now,
    updatedAt: now,
  };
}
