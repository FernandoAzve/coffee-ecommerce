import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import '../Styles/MeusPedidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function MeusPedidos() {
  const { isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      fetchPedidos();
    }
  }, [loading, isAuthenticated, navigate]);

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:5000/meus-pedidos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPedidos(response.data.pedidos);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home-page">
      <TopBar />
      <Header />
      <div className="center-content">
        <h2>Meus pedidos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Previsão de entrega</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id_pedido}>
                <td>#{pedido.id_pedido}</td>
                <td>R$ {pedido.valor.toFixed(2)}</td>
                <td>{pedido.status}</td>
                <td>{pedido.data_entrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MeusPedidos;