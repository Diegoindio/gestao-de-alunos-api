import { randomUUID } from 'node:crypto';

export function createMatricula({ alunoId, disciplinaId }) {
  return {
    id: randomUUID(),
    alunoId,
    disciplinaId,
    dataMatricula: new Date().toISOString(),
  };
}
