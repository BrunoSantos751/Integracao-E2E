// src/TesteFront.spec.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TesteFront from './TesteFront';
import axios from 'axios';
import { vi } from 'vitest'; // Usamos 'vi' do Vitest

// Mocka o módulo axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Componente TesteFront', () => {

  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
  });

  it('Deve exibir a lista de usuários ao carregar a página (mock GET)', async () => {
    // 1. Prepara o mock
    const mockUsers = [
      { id: 1, name: 'Marcos', email: 'marcos@example.com' },
      { id: 2, name: 'Ana', email: 'ana@example.com' }
    ];
    // Simula a resposta do GET
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    // 2. Renderiza o componente
    render(<TesteFront />);

    // 3. Verifica o resultado
    // Usamos 'await findByText' (que espera) com uma Expressão Regular (/.../i)
    // para ignorar espaços em branco e maiúsculas/minúsculas.
    expect(await screen.findByText(/Marcos/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ana/i)).toBeInTheDocument();
    
    // Verifica se a chamada à API foi feita corretamente
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/users');
  });


  it('Deve criar um novo usuário ao submeter o formulário (mock POST)', async () => {
    // 1. Prepara os mocks
    const mockNewUser = { id: 3, name: 'Carlos', email: 'carlos@example.com' };
    
    // Mock do GET inicial (para carregar a página)
    mockedAxios.get.mockResolvedValueOnce({ data: [] }); 
    // Mock do POST (para o envio do formulário)
    mockedAxios.post.mockResolvedValueOnce({ data: mockNewUser });

    // 2. Renderiza o componente
    render(<TesteFront />);

    // 3. Simula a Ação do Usuário
    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Carlos' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'carlos@example.com' }
    });
    fireEvent.click(screen.getByText('Cadastrar')); // Clica no botão

    // 4. Verifica o resultado
    // Espera o nome 'Carlos' aparecer na lista após o cadastro
    expect(await screen.findByText(/Carlos/i)).toBeInTheDocument();

    // Verifica se o POST foi chamado com os dados corretos
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/users', 
      { name: 'Carlos', email: 'carlos@example.com' }
    );
  });
});