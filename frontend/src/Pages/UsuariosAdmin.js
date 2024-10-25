import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { useAuth } from '../AuthContext'; // Importa o contexto de autenticação
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
    </div>
  );
};

function UsuariosAdmin() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirecionamento
  const { isAdminAuthenticated, logoutAdmin } = useAuth(); // Verifica se o admin está autenticado e obtém a função de logout

  // Função para buscar clientes
  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem('adminToken'); // Obtém o token do localStorage
      const response = await fetch('http://localhost:5000/clientes', {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
      } else {
        // Redireciona para login caso o token seja inválido ou expirado
        logoutAdmin();
        navigate('/login-admin');
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar cliente
  const handleDeleteCliente = async (id) => {
    try {
      const token = localStorage.getItem('adminToken'); // Obtém o token do localStorage
      const response = await fetch(`http://localhost:5000/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });
      if (response.ok) {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
        alert('Cliente removido com sucesso.');
      } else {
        alert('Erro ao remover o cliente.');
      }
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  // useEffect para validar o token e buscar clientes ao carregar o componente
  useEffect(() => {
    if (!isAdminAuthenticated) {
      // Se o admin não estiver autenticado, redireciona para a página de login
      navigate('/login-admin');
    } else {
      fetchClientes(); // Busca clientes se autenticado
    }
  }, [isAdminAuthenticated, navigate]);

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/usuarios-admin">Usuários</a>
          <a href="/pedidos-admin">Pedidos</a>
          <a href="/estoque-admin">Estoque</a>
          <a href="/acesso-privilegiado">Acesso Privilegiado</a>
        </nav>
      </header>
      <div className="center-content">
        <h2>Usuários</h2>
        {isLoading ? (
          <div className="shimmer-container">
            <Shimmer />
          </div>
        ) : (
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID Usuário</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Logradouro</th>
                <th>Número</th>
                <th>Complemento</th>
                <th>CEP</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Telefone</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={index}>
                  <td title={cliente.id}>{cliente.id}</td>
                  <td title={cliente.nome}>{cliente.nome}</td>
                  <td title={cliente.cpf}>{cliente.cpf}</td>
                  <td title={cliente.email}>{cliente.email}</td>
                  <td title={cliente.endereco.logradouro}>{cliente.endereco.logradouro}</td>
                  <td title={cliente.endereco.numero}>{cliente.endereco.numero}</td>
                  <td title={cliente.endereco.complemento}>{cliente.endereco.complemento}</td>
                  <td title={cliente.endereco.cep}>{cliente.endereco.cep}</td>
                  <td title={cliente.endereco.bairro}>{cliente.endereco.bairro}</td>
                  <td title={cliente.endereco.cidade}>{cliente.endereco.cidade}</td>
                  <td title={cliente.endereco.estado}>{cliente.endereco.estado}</td>
                  <td title={cliente.telefone}>{cliente.telefone}</td>
                  <td>
                    <button className="btn btn-link p-0" onClick={() => handleDeleteCliente(cliente.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UsuariosAdmin;
