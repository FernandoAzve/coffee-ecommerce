import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useUserAuth } from '../UserAuthContext';

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

function CafeArabica() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { isAuthenticated, setRedirectUrl, checkAuthentication } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        const produtosArabica = response.data.filter(produto => produto.categoria === 'Café Arábica');
        setProdutos(produtosArabica);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleAddToCart = async (produto) => {
    checkAuthentication();
    if (!isAuthenticated) {
      setRedirectUrl('/');
      navigate('/login');
    } else {
      try {
        const token = localStorage.getItem('userToken');
        const data = {
          id_produto: produto.id,
          valor_unitario: parseFloat(produto.preco),
          quantidade: 1
        };
        console.log('Enviando dados para o backend:', data);
        const response = await axios.post('http://localhost:5000/carrinho', data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Produto adicionado ao carrinho:', response.data);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
      }
    }
  };

  return (
    <div className="home-page">
      <Header />
      <h2 className="center-content">Café Arábica</h2>
      {isLoading ? (
        <div className="shimmer-container">
          <Shimmer />
        </div>
      ) : (
        <section className="mais-comprados">
          <div className="produtos">
            {produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <div key={index} className="produto">
                  <div className="imagem">
                    <img src={produto.imagem} alt={produto.nome} />
                  </div>
                  <p>{produto.nome}</p>
                  <p>{`R$ ${produto.preco}`}</p>
                  <button className='produtos-button' onClick={() => handleAddToCart(produto)}>
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </section>
      )}
      {showConfirmation && (
        <div className="confirmation-message">
          Produto adicionado ao carrinho com sucesso!
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CafeArabica;