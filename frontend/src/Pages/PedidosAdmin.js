import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';
import axios from 'axios';
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
    </div>
  );
};

function PedidosAdmin() {
  const { isAdminAuthenticated, loading, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    if (!isAdminAuthenticated && !loading) {
      navigate('/login-admin');
    } else if (isAdminAuthenticated) {
      fetchPedidos();
    }
  }, [isAdminAuthenticated, loading, navigate]);

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/todos-pedidos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPedidos(response.data.pedidos);
      setStatusOptions(response.data.status);
      setIsLoading(false); // Definir como falso após carregar os dados
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      setIsLoading(false); // Definir como falso em caso de erro
    }
  };

  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/atualizar-status-pedido/${pedidoId}`, { id_status: novoStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchPedidos(); // Atualiza a lista de pedidos após a mudança de status
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

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
          <button onClick={logoutAdmin} className='logout-button'>Logout</button>
        </nav>
      </header>
      <div className="center-content">
        <h2>Pedidos</h2>
        {isLoading ? (
          <div>
            <Shimmer />
          </div>
        ) : (
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>ID Usuário</th>
                <th>Produtos</th>
                <th>Valor</th>
                <th className="status">Status</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                const statusAtual = statusOptions.find(status => status.id_status === pedido.id_status);
                return (
                  <tr key={pedido.id_pedido}>
                    <td>#{pedido.id_pedido}</td>
                    <td>#{pedido.id_cliente}</td>
                    <td>{pedido.produtos}</td>
                    <td>R$ {pedido.valor.toFixed(2)}</td>
                    <td>
                      <select
                        className="form-select"
                        value={pedido.id_status}
                        onChange={(e) => handleStatusChange(pedido.id_pedido, e.target.value)}
                      >
                        {statusOptions.map((status) => {
                          return (
                            <option key={status.id_status} value={status.id_status}>
                              {status.nome_status}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>{pedido.endereco}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PedidosAdmin;