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

function CafeArabica() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setRedirectUrl, checkAuthentication, loading } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        const produtosAcessorios = response.data.filter(produto => produto.categoria === 'Café Arábica');
        setProdutos(produtosAcessorios);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = () => {
    checkAuthentication(); // Verifica a autenticação do usuário
    if (loading) {
      return; // Aguarda o carregamento
    }
    if (!isAuthenticated) {
      setRedirectUrl('/cafe-arabica'); // Define a URL de redirecionamento após o login
      navigate('/login'); // Redireciona para a página de login
    } else {
      // Lógica para adicionar ao carrinho
      console.log('Produto adicionado ao carrinho');
    }
  };

  return (
    <div className="cafe-page">
      <TopBar />
      <Header />
      <div className="center-content">
        <h1>Cafés 100% Arábica</h1>
        <p className="description">
          Descubra a pureza e a excelência dos cafés 100% arábica. Experimente sabores extraordinários em cada xícara.
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
                <button className='produtos-button' onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum acessório encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CafeArabica;