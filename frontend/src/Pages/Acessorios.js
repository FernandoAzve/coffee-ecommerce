import React, { useState, useEffect } from 'react';
import '../Styles/CafeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
    </div>
  );
};

function Acessorios() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição da mensagem de confirmação
  const { isAuthenticated, setRedirectUrl, checkAuthentication, loading } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        const produtosAcessorios = response.data.filter(produto => produto.categoria === 'Acessórios');
        setProdutos(produtosAcessorios);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = async (produto) => {
    checkAuthentication(); // Verifica a autenticação do usuário
    if (loading) {
      return; // Aguarda o carregamento
    }
    if (!isAuthenticated) {
      setRedirectUrl('/acessorios'); // Define a URL de redirecionamento após o login
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
    <div className="cafe-page">
      <TopBar />
      <Header />
      <div className="center-content">
        <h1>Acessórios</h1>
        <p className="description">
          Descubra a excelência em cada detalhe com nossa seleção de acessórios para café gourmet.
        </p>
        {isLoading && (
          <div className="shimmer-container">
            <Shimmer />
          </div>
        )}
      </div>

      <section className="mais-comprados">
        <div className="produtos">
          {isLoading ? (
            <p></p>
          ) : produtos.length > 0 ? (
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
            <p>Nenhum acessório encontrado.</p>
          )}
        </div>
      </section>
      {showConfirmation && (
        <div className="confirmation-message">
          Produto adicionado ao carrinho com sucesso!
        </div>
      )}
    </div>
  );
}

export default Acessorios;