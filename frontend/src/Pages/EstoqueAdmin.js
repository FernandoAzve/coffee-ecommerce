import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useAdminAuth } from '../AdminAuthContext'; // Importa o contexto de autenticação

const EstoqueAdmin = () => {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useAdminAuth(); // Usa o estado de autenticação do admin

  // Verifica se o admin está autenticado
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/login-admin'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        setProdutos(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      });
  }, []);

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
        <h2>Estoque</h2>
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Imagem</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{`R$ ${produto.preco}`}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.categoria}</td>
                  <td>{produto.imagem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EstoqueAdmin;