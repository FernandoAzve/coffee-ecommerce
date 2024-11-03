import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';

import { Modal, Button } from 'react-bootstrap';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
    </div>
  );
};

function Carrinho() {
  const { isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

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
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchItensCarrinho();
    }
  }, [isAuthenticated]);

  const handleFinalizarCompra = () => {
    navigate('/finalizar-pedido');
  };

  const handleAlterarQuantidade = async () => {
    if (newQuantity < 1 || newQuantity > 99) return;
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(`http://localhost:5000/carrinho/${selectedItem.id_carrinho}/alterar-quantidade`, { quantidade: newQuantity }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setItensCarrinho(response.data.itens);
      const totalCompra = response.data.itens.reduce((acc, item) => acc + item.valor_unitario * item.quantidade, 0);
      setTotal(totalCompra);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao alterar quantidade do item no carrinho:', error);
    }
  };

  const handleExcluirItem = async (itemId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.delete(`http://localhost:5000/carrinho/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setItensCarrinho(response.data.itens);
      const totalCompra = response.data.itens.reduce((acc, item) => acc + item.valor_unitario * item.quantidade, 0);
      setTotal(totalCompra);
    } catch (error) {
      console.error('Erro ao excluir item do carrinho:', error);
    }
  };

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.quantidade);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home-page">
      <Header />
      <div className="center-content">
        <h2>Carrinho</h2>
        {isLoading ? (
          <div className="shimmer-container">
            <Shimmer />
          </div>
        ) : (
          <>
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
                      <button
                        className="btn btn-secondary btn-sm ms-2"
                        onClick={() => handleShowModal(item)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => handleExcluirItem(item.id_carrinho)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
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
          </>
        )}
      </div>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Quantidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            min="1"
            max="99"
            value={newQuantity}
            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
            style={{ width: '100%', textAlign: 'center' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAlterarQuantidade}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Carrinho;