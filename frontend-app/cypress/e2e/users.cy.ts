// cypress/e2e/users.cy.ts

describe('Fluxo de integração usuário', () => {

  it('Deve visitar a página, criar um novo usuário e vê-lo na lista', () => {
    // 1. Visita a página
    cy.visit('http://localhost:5173');

    // 2. Cria dados únicos
    const uniqueName = `Ana E2E ${Date.now()}`;
    const uniqueEmail = `ana_e2e_${Date.now()}@example.com`;

    // 3. Preenche o formulário
    cy.get('input[placeholder="Nome"]').type(uniqueName);
    cy.get('input[placeholder="Email"]').type(uniqueEmail);

    // 4. Envia
    cy.get('button[type="submit"]').click();

    // 5. Verifica se o nome e email aparecem na lista
    cy.contains(uniqueName).should('be.visible');
    cy.contains(uniqueEmail).should('be.visible');
  });


  
  it('Deve criar um usuário, buscar por seu ID e encontrar ele', () => {
    
 
    // Intercepta a requisição POST para a API de backend
    cy.intercept('POST', 'http://localhost:3000/users').as('createUserRequest');
    
    cy.visit('http://localhost:5173');


    const nameA = `Usuário-Para-Buscar-${Date.now()}`;
    cy.get('input[placeholder="Nome"]').type(nameA);
    cy.get('input[placeholder="Email"]').type('buscar@example.com');
    cy.get('button[type="submit"]').click();

    let idDoUsuarioA;

    cy.wait('@createUserRequest').then((interception) => {
      // Pega o ID da resposta da API e salva na variável
      cy.log('Usuário A criado com ID:', interception.response.body.id);
      idDoUsuarioA = interception.response.body.id;
    });

    const nameB = `Outro-Usuario-${Date.now()}`;
    cy.get('input[placeholder="Nome"]').type(nameB);
    cy.get('input[placeholder="Email"]').type('outro@example.com');
    cy.get('button[type="submit"]').click();


    // Garante que os dois usuários estão na tela antes da busca
    cy.contains(nameA).should('be.visible');
    cy.contains(nameB).should('be.visible');

    
    cy.then(() => {
      cy.get('input[placeholder="Buscar por ID "]').type(idDoUsuarioA);
      cy.get('button.teste-butt').contains('Buscar').click();
    });

    // --- 6. Verificação Pós-Busca ---
    // O Usuário A (do ID buscado) deve estar visível
    cy.contains(nameA).should('be.visible');
    // O Usuário B (que tem outro ID) não deve mais existir na lista
    cy.contains(nameB).should('not.exist');
  });

});