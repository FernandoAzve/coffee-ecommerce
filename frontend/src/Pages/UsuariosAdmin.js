import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { useAdminAuth } from '../AdminAuthContext'; // Importa o contexto de autenticação
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
  const { isAdminAuthenticated, logoutAdmin } = useAdminAuth(); // Verifica se o admin está autenticado e obtém a função de logout

  // Função para buscar clientes
  const fetchClientes = useCallback(async () => {
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
    } finally {
      setIsLoading(false);
    }
  }, [logoutAdmin, navigate]);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/login-admin'); // Redireciona para a página de login se não estiver autenticado
    } else {
      fetchClientes(); // Busca os clientes quando o admin está autenticado
    }
  }, [isAdminAuthenticated, fetchClientes, navigate]);

  // Exibe o shimmer enquanto os dados estão sendo carregados
  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="admin-page">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/usuarios-admin">Usuários</a>
          <a href="/pedidos-admin">Pedidos</a>
          <a href="/estoque-admin">Estoque</a>
          <a href="/acesso-privilegiado">Acesso Privilegiado</a>
          <button onClick={logoutAdmin}>Logout</button>
        </nav>
      </header>
      <div className="center-content">
        <h2>Usuários</h2>
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>
                  {/* Adicione ações aqui, se necessário */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuariosAdmin;