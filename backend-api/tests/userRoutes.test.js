const request = require('supertest');
const app = require('../app'); // Importa o app (sem o .listen())

describe('Integração das rotas de usuários', () => {

  // Limpa o array de usuários antes de cada teste para evitar interferências
  let usersDb = []; // Simula o DB
  let appInstance;

  beforeAll(() => {
    // Como nosso 'app.js' não exporta o array 'users', 
    // os testes dependerão da ordem de execução ou estado compartilhado.
    // O teste de GET /users:id lidará com sua própria criação.
  });


  it('Deve criar um novo usuário e retornar 201', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Marcos', email: 'marcos@example.com' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id'); // Verifica se um ID foi gerado
    expect(res.body.name).toBe('Marcos');
  });

  it('Deve listar os usuários (contendo o usuário criado)', async () => {
    const res = await request(app).get('/users');
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Deve ser um array
    expect(res.body.length).toBeGreaterThan(0); // Deve ter pelo menos 1 usuário
    expect(res.body[0].name).toBe('Marcos'); // Verifica se o usuário anterior está lá
  });

  it('Deve retornar detalhes de um usuário específico', async () => {
    // 1. Cria um usuário para garantir que ele exista
    const newUser = { name: 'Ana', email: 'ana@example.com' };
    const createRes = await request(app).post('/users').send(newUser);
    const userId = createRes.body.id; // Pega o ID do usuário recém-criado

    // 2. Busca esse usuário pelo ID
    const res = await request(app).get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.name).toBe('Ana');
  });

  it('Deve retornar 404 para um usuário inexistente', async () => {
    const res = await request(app).get('/users/99999'); // Um ID que certamente não existe
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Usuário não encontrado');
  });

  it('Deve retornar 400 se faltar nome ou email ao criar', async () => {
    // Testando sem nome
    const resNoName = await request(app)
      .post('/users')
      .send({ email: 'semnome@example.com' });
      
    expect(resNoName.statusCode).toBe(400);

    // Testando sem email
    const resNoEmail = await request(app)
      .post('/users')
      .send({ name: 'Sem Email' });

    expect(resNoEmail.statusCode).toBe(400);
    
  });
});