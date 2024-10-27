import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';

function FinalizarPedido() {
  const { isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição da mensagem de confirmação

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const data = {
        endereco,
        numero,
        complemento,
        cep
      };
      const response = await axios.post('http://localhost:5000/pedidos', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Pedido realizado com sucesso:', response.data);
      setShowConfirmation(true); // Exibir a mensagem de confirmação
      setTimeout(() => {
        setShowConfirmation(false); // Ocultar a mensagem de confirmação após 3 segundos
        navigate('/meus-pedidos'); // Redirecionar após a animação
      }, 3000);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home-page">
      <Header />
      <h2 className="center-content">Finalizar pedido</h2>
      <form style={{ maxWidth: '300px', margin: '0 auto' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Endereço de entrega"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Complemento"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Finalizar Pedido
        </button>
      </form>
      {showConfirmation && (
        <div className="confirmation-message">
          Pedido realizado com sucesso!
        </div>
      )}
    </div>
  );
}

export default FinalizarPedido;