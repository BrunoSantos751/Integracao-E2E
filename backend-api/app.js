const express = require('express');
const cors = require('cors');
const app = express();

// --- Middlewares ---
app.use(express.json()); 
app.use(cors()); 

// --- Banco de Dados "Fake" (em memória) ---
let users = [];
let nextId = 1;

// --- Rotas ---

/**
 * GET /users
 * Retorna a lista de todos os usuários.
 */
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

/**
 * POST /users
 * Cria um novo usuário.
 */
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validação simples
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);
  // Retorna 201 (Created) e o objeto do novo usuário
  res.status(201).json(newUser); 
});

/**
 * GET /users/:id
 * Retorna os detalhes de um usuário específico.
 */
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    // Se não encontrar, retorna 404 (Not Found)
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Se encontrar, retorna 200 (OK) e os dados do usuário
  res.status(200).json(user);
});


module.exports = app;