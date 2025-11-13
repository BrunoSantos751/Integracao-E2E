# Teste de Integração Frontend e Backend: Gestão de Usuários

Este projeto é uma atividade prática para demonstrar um fluxo completo de testes de integração (End-to-End) entre um cliente (Frontend) e um servidor (Backend).

O objetivo é validar que:
1.  O **Backend** expõe uma API funcional e testada.
2.  O **Frontend** consome essa API e reage corretamente às respostas.
3.  O sistema **completo** funciona da perspectiva do usuário, do clique ao banco de dados (em memória).

---

## 🛠️ Tecnologias Utilizadas

* **Backend (na pasta `/backend-api`)**
    * Node.js
    * Express.js (para o servidor API)
    * CORS
    * Jest (Framework de testes)
    * Supertest (Para testes de rotas HTTP)

* **Frontend (na pasta `/frontend-app`)**
    * React (com Vite)
    * TypeScript
    * Axios (Para requisições HTTP)
    * Vitest (Framework de testes, substituto do Jest)
    * React Testing Library (Para testes de componentes)

* **Testes E2E (End-to-End)**
    * Cypress

---

## 🚀 Como Rodar o Projeto Completo

Para executar o ambiente de desenvolvimento e os testes E2E, você precisará de **3 terminais** rodando simultaneamente.

### 1. Terminal 1: Rodar o Backend

O servidor da API rodará na porta `http://localhost:3000`.

```bash
# 1. Navegue até a pasta do backend
cd backend-api

# 2. Instale as dependências
npm install

# 3. Inicie o servidor em modo de desenvolvimento
npm run dev
```
**Resultado Esperado:**
```
🚀 Servidor rodando na porta 3000
```

### 2. Terminal 2: Rodar o Frontend

A aplicação React rodará na porta `http://localhost:5173`.

```bash
# 1. Navegue até a pasta do frontend
cd frontend-app

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação
npm run dev
```
**Resultado Esperado:**
```
  VITE vX.X.X  ready in XXXms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Neste ponto, a aplicação completa está no ar e pronta para os testes E2E.

---

## 🧪 Instruções e Resultados dos Testes

O projeto é dividido em 3 fases de teste, conforme os critérios de avaliação.

### Fase 1: Testes de Integração do Backend (Jest + Supertest)

Estes testes validam se a API (rotas, controllers, lógica de negócio) está funcionando de forma isolada.

**Como rodar:**
```bash
# No terminal do backend (pode ser um novo ou o mesmo)
cd backend-api
npm test
```

**Resultados Esperados:** O Jest executará os testes e mostrará que todas as rotas (`GET /users`, `POST /users`, `GET /users/:id`) estão funcionando.

```bash
PASS  tests/userRoutes.test.js
  Integração das rotas de usuários
    ✓ Deve criar um novo usuário e retornar 201 (52ms)
    ✓ Deve listar os usuários (contendo o usuário criado) (5ms)
    ✓ Deve retornar detalhes de um usuário específico (12ms)
    ✓ Deve retornar 404 para um usuário inexistente (4ms)
    ✓ Deve retornar 400 se faltar nome ou email ao criar (8ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Time:        1.234s
```

### Fase 2: Testes de Integração do Frontend (Vitest + RTL)

Estes testes validam se o componente React (`TesteFront.tsx`) reage corretamente às **respostas simuladas (mockadas)** da API. Ele não testa o backend real.

**Como rodar:**
```bash
# No terminal do frontend (pode ser um novo ou o mesmo)
cd frontend-app
npm test
```

**Resultados Esperados:** O Vitest executará os testes e mostrará que o componente renderiza os dados de um `GET` mockado e atualiza a lista após um `POST` mockado.

```bash
PASS  src/TesteFront.spec.tsx (2)
  Componente TesteFront
    ✓ Deve exibir a lista de usuários ao carregar a página (mock GET) (150ms)
    ✓ Deve criar um novo usuário ao submeter o formulário (mock POST) (120ms)

Test Files  1 passed (1)
Tests       2 passed (2)
Start at    11:15:01
Duration    1.42s
```

### Fase 3: Testes Ponta-a-Ponta (E2E com Cypress)

Este é o teste final. Ele valida o **fluxo completo** (Frontend + Backend) como se fosse um usuário real.

**Pré-requisito:** Os servidores do Backend (Terminal 1) e Frontend (Terminal 2) **DEVEM** estar rodando.

**Como rodar:**
```bash
# 1. No Terminal 3, navegue até o frontend
cd frontend-app

# 2. Abra o Cypress
npx cypress open
```

**Instruções na Janela do Cypress:**
1.  Escolha "E2E Testing".
2.  Escolha um navegador (ex: Chrome).
3.  Clique no teste `users.cy.ts` para executá-lo.

**Resultados Esperados:** O Cypress abrirá uma janela do navegador e executará os testes. Você verá o robô visitar `http://localhost:5173`, preencher os formulários, criar usuários, buscar pelo ID e validar que a interface se atualizou corretamente.

Ambos os testes  devem ficar verdes, indicando sucesso na integração total.
