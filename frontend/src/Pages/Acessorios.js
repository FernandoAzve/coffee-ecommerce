import React from 'react';
import '../Styles/CafeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Acessorios() {
  return (
    <div className="cafe-page">

      <TopBar />

      <Header />

      <div className="center-content">
        <h1>Acessórios</h1>
        <p className="description">
          Descubra a excelência em cada detalhe com nossa seleção de acessórios para café gourmet.
        </p>
      </div>

      <section className="mais-comprados">
        <div className="produtos">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="produto">
              <div className="imagem">IMAGEM</div>
              <p>Cafeteira</p>
              <p>R$ 499,95</p>
              <button className='produtos-button'>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Acessorios;
