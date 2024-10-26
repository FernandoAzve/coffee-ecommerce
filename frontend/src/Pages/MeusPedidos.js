import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import '../Styles/MeusPedidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function MeusPedidos() {
  const { isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

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
            <tr>
              <td>#125</td>
              <td>R$ 36,00</td>
              <td>Em preparação</td>
              <td>31/12/2024</td>
            </tr>
            <tr>
              <td>#126</td>
              <td>R$ 45,00</td>
              <td>Enviado</td>
              <td>01/01/2025</td>
            </tr>
            {/* Outros pedidos podem ser mapeados aqui */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MeusPedidos;