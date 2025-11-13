import { useState, useEffect } from "react";
import axios from 'axios'; 
import "./TesteFront.css";

interface User {
  id: number;
  name: string; 
  email: string;
}

const API_URL = 'http://localhost:3000';

export function TesteFront() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  // Estado para o novo usuário (usando 'name')
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // NOVO: Função para carregar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Carrega os usuários da API quando o componente montar
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtra por ID ou Email (agora buscando do estado 'users' que veio da API)
  const handleSearch = () => {
    if (!search.trim()) {
      fetchUsers(); // Recarrega todos se a busca estiver vazia
      return;
    }

    const lowerSearch = search.toLowerCase();
    const filtered = users.filter(
      (u) =>
        u.id.toString() === lowerSearch 
    );
    setUsers(filtered);
  };

  // NOVO: Adiciona novo usuário (via API)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Envia o novo usuário para a API (POST)
      const response = await axios.post(`${API_URL}/users`, newUser);
      
      // 2. Atualiza o estado local com o usuário retornado pela API (que inclui o ID)
      setUsers((prev) => [...prev, response.data]);
      
      // 3. Limpa os campos
      setNewUser({ name: "", email: "" });

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="user-page">
      <h1>Lista de Usuários</h1>
      {/* Busca */}
      <div className="search">
        <input
          type="text"
          placeholder="Buscar por ID "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="teste-butt" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {/* Tabela */}
      <div className="tabela-teste">
        <h2>Usuários Cadastrados</h2>
        <ul>
          {users.map((u) => (
            <li className="li-teste" key={u.id}>
              <strong>ID:</strong> {u.id} — <strong>Nome:</strong> {u.name} — {/* ALTERADO */}
              <strong>Email:</strong> {u.email} <hr />
            </li>
          ))}
        </ul>
      </div>

      {/* Formulário */}
      <hr />
      <h2>Adicionar Novo Usuário</h2>
      <form onSubmit={handleRegister}>
        <div className="form-teste">
          <input
            type="text"
            placeholder="Nome"
            value={newUser.name} // ALTERADO
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} // ALTERADO
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <button className="teste-but" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
export default TesteFront;