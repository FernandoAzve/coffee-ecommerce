import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import '../Styles/Carrinho.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Carrinho() {
  const { isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchItensCarrinho = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:5000/carrinho', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setItensCarrinho(response.data.itens);
        const totalCompra = response.data.itens.reduce((acc, item) => acc + item.valor_unitario * item.quantidade, 0);
        setTotal(totalCompra);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      }
    };

    if (isAuthenticated) {
      fetchItensCarrinho();
    }
  }, [isAuthenticated]);

  const handleFinalizarCompra = () => {
    navigate('/finalizar-pedido');
  };

  const handleDeduzirItem = async (itemId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(`http://localhost:5000/carrinho/${itemId}/deduzir`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setItensCarrinho(response.data.itens);
      const totalCompra = response.data.itens.reduce((acc, item) => acc + item.valor_unitario * item.quantidade, 0);
      setTotal(totalCompra);
    } catch (error) {
      console.error('Erro ao deduzir item do carrinho:', error);
    }
  };

  const handleAdicionarItem = async (itemId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(`http://localhost:5000/carrinho/${itemId}/adicionar`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setItensCarrinho(response.data.itens);
      const totalCompra = response.data.itens.reduce((acc, item) => acc + item.valor_unitario * item.quantidade, 0);
      setTotal(totalCompra);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
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
        <h2>Carrinho</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Valor Unitário</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itensCarrinho.map((item) => (
              <tr key={item.id_carrinho}>
                <td>{item.produto_nome}</td>
                <td>R$ {item.valor_unitario.toFixed(2)}</td>
                <td>R$ {(item.valor_unitario * item.quantidade).toFixed(2)}</td>
                <td>
                  {item.quantidade}
                  <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => handleDeduzirItem(item.id_carrinho)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <button
                      className="btn btn-success btn-sm ml-2"
                      style={{ borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '5px' }}
                      onClick={() => handleAdicionarItem(item.id_carrinho)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-container">
          <div className="total">
            <span>Total: R$ {total.toFixed(2)}</span>
          </div>
          <div className="finalizar-compra">
            <button className="btn btn-primary" onClick={handleFinalizarCompra}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;