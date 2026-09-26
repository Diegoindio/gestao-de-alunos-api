import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect } from 'chai';
import { api } from '../helpers/api.js';
import { loginAdmin, loginAluno } from '../helpers/auth.js';

const { cenarios } = JSON.parse(readFileSync(new URL('../data/entregas.json', import.meta.url), 'utf8'));

describe('Entrega de trabalho pelo aluno (Data-Driven Testing)', () => {
  for (const [indice, cenario] of cenarios.entries()) {
    it(`executa o fluxo completo para ${cenario.descricao}`, async () => {
      const sufixo = randomUUID().replaceAll('-', '');
      const aluno = {
        ...cenario.aluno,
        email: `aluno-${sufixo}@example.com`,
        matricula: `${Date.now()}-${indice}`,
      };

      const tokenAdmin = await loginAdmin();
      expect(tokenAdmin).to.be.a('string').and.not.empty;

      const cadastro = await api()
        .post('/api/admin/alunos')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(aluno);
      expect(cadastro.status, JSON.stringify(cadastro.body)).to.equal(201);
      expect(cadastro.body).to.include({ nome: aluno.nome, email: aluno.email, matricula: aluno.matricula });
      expect(cadastro.body).not.to.have.property('senha');
      const alunoId = cadastro.body.id;
      expect(alunoId).to.be.a('string').and.not.empty;

      const matricula = await api()
        .post(`/api/admin/disciplinas/${cenario.disciplinaId}/matriculas`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ alunoId });
      expect(matricula.status, JSON.stringify(matricula.body)).to.equal(201);
      expect(matricula.body).to.include({ alunoId, disciplinaId: cenario.disciplinaId });

      const tokenAluno = await loginAluno(aluno.email, aluno.senha);
      expect(tokenAluno).to.be.a('string').and.not.empty;

      const entrega = await api()
        .post(`/api/alunos/${alunoId}/trabalhos`)
        .set('Authorization', `Bearer ${tokenAluno}`)
        .send({ disciplinaId: cenario.disciplinaId, ...cenario.trabalho });
      expect(entrega.status, JSON.stringify(entrega.body)).to.equal(201);
      expect(entrega.body).to.include({ alunoId, disciplinaId: cenario.disciplinaId, titulo: cenario.trabalho.titulo, status: 'entregue' });
      expect(entrega.body.id).to.be.a('string').and.not.empty;

      const consulta = await api()
        .get(`/api/alunos/${alunoId}/trabalhos`)
        .set('Authorization', `Bearer ${tokenAluno}`);
      expect(consulta.status).to.equal(200);
      expect(consulta.body.some((trabalho) => trabalho.id === entrega.body.id)).to.equal(true);
    });
  }
});
