import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomeStyles.css'; // Importar os estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
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

function CafeFrutados() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição da mensagem de confirmação
  const { isAuthenticated, setRedirectUrl, checkAuthentication } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        const produtosFrutado = response.data.filter(produto => produto.categoria === 'Café Frutado');
        setProdutos(produtosFrutado);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleAddToCart = async (produto) => {
    checkAuthentication(); // Verifica a autenticação do usuário
    if (!isAuthenticated) {
      setRedirectUrl('/cafe-frutados'); // Define a URL de redirecionamento após o login
      navigate('/login'); // Redireciona para a página de login
    } else {
      try {
        const token = localStorage.getItem('userToken');
        const data = {
          id_produto: produto.id,
          valor_unitario: parseFloat(produto.preco), // Converte para número
          quantidade: 1 // Defina a quantidade desejada
        };
        console.log('Enviando dados para o backend:', data);
        const response = await axios.post('http://localhost:5000/carrinho', data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Produto adicionado ao carrinho:', response.data);
        setShowConfirmation(true); // Exibir a mensagem de confirmação
        setTimeout(() => {
          setShowConfirmation(false); // Ocultar a mensagem de confirmação após 3 segundos
        }, 3000);
      } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
      }
    }
  };

  return (
    <div className="home-page">
      <Header />
      <h2 className="center-content">Cafés Frutados</h2>
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
    </div>
  );
}

export default CafeFrutados;