import React, { useState, useEffect } from 'react';
import '../Styles/HomeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';
import axios from 'axios';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
    </div>
  );
};

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        const produtosAcessorios = response.data.filter(produto => produto.categoria === 'Acessórios');
        const produtosArabica = response.data.filter(produto => produto.categoria === 'Café Arábica');
        const produtosFrutado = response.data.filter(produto => produto.categoria === 'Café Frutado');

        const getRandomItems = (arr, num) => {
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, num);
        };

        const selectedAcessorios = getRandomItems(produtosAcessorios, 2);
        const selectedArabica = getRandomItems(produtosArabica, 2);
        const selectedFrutado = getRandomItems(produtosFrutado, 2);

        let selectedProducts = [...selectedAcessorios, ...selectedArabica, ...selectedFrutado];

        if (selectedProducts.length < 6) {
          const remainingProducts = response.data.filter(produto => !selectedProducts.includes(produto));
          const additionalProducts = getRandomItems(remainingProducts, 6 - selectedProducts.length);
          selectedProducts = [...selectedProducts, ...additionalProducts];
        }

        setProdutos(selectedProducts);

        setTimeout(() => {
          setIsLoading(false);
        }, 650);

      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="home-page">
      <TopBar />
      <Header />
      <div className="banner">BANNER</div>
      <h2 className="center-content">Produtos em Destaque</h2>
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
                  <button className='produtos-button'>Adicionar ao Carrinho</button>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;