import { api } from './api.js';
import 'dotenv/config';

let tokenEmCache = null

export async function comTokenDeAdmin() {
    if (!tokenEmCache) {
        const loginResposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 
                    email: process.env.ADMIN_EMAIL || 'admin@escola.com',
                    senha: process.env.ADMIN_SENHA || 'admin123'
            });
        
        tokenEmCache = loginResposta.body.token;
    }

    return `Bearer ${tokenEmCache}`;
}

export async function getToken(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ 
            email: emailUser, 
            senha: passUser
        });

    return loginResposta.body.token;
}

export async function loginAdmin() {
    return getToken(process.env.ADMIN_EMAIL || 'admin@escola.com', process.env.ADMIN_SENHA || 'admin123');
}

export async function loginAluno(email, senha) {
    return getToken(email, senha);
}
