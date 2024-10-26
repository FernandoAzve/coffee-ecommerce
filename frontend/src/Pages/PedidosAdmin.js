import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { useAdminAuth } from '../AdminAuthContext'; // Importa o contexto de autenticação
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function PedidosAdmin() {
  const { isAdminAuthenticated, loading, logoutAdmin } = useAdminAuth(); // Verifica se o admin está autenticado e o estado de carregamento
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    console.log('isAdminAuthenticated:', isAdminAuthenticated); // Adicione este log para depuração
    // Se o admin não estiver autenticado, redireciona para a página de login
    if (!isAdminAuthenticated && !loading) {
      navigate('/login-admin');
    }
  }, [isAdminAuthenticated, loading, navigate]);

  // Exibe um spinner de carregamento enquanto verifica a autenticação
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/usuarios-admin">Usuários</a>
          <a href="/pedidos-admin">Pedidos</a>
          <a href="/estoque-admin">Estoque</a>
          <a href="/acesso-privilegiado">Acesso Privilegiado</a>
          <button onClick={logoutAdmin}>Logout</button> {/* Botão de logout */}
        </nav>
      </header>
      <div className="center-content">
        <h2>Pedidos</h2>
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>ID Usuário</th>
              <th>Produtos</th>
              <th>Valor</th>
              <th>Endereço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#432</td>
              <td>#001</td>
              <td>1x Café Arábica, 2x Café Frutados, 1x Cafeteira</td>
              <td>R$ 601,00</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Processando
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <button className="dropdown-item" type="button">Pendente</button>
                    <button className="dropdown-item" type="button">Processando</button>
                    <button className="dropdown-item" type="button">Enviado</button>
                    <button className="dropdown-item" type="button">Entregue</button>
                  </div>
                </div>
              </td>
            </tr>
            {/* Outros pedidos podem ser mapeados aqui */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PedidosAdmin;