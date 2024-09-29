import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function CafeArabica() {
  return (
    <div className="cafe-page">

      <TopBar />

      <Header />

      <div className="center-content">
        <h1>Cafés 100% Arábica</h1>
        <p className="description">
          Descubra a pureza e a excelência dos cafés 100% arábica. Experimente sabores extraordinários em cada xícara.
        </p>
      </div>

      <section className="mais-comprados">
        <div className="produtos">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="produto">
              <div className="imagem">IMAGEM</div>
              <p>Café 100% Arábica</p>
              <p>R$ 18,79</p>
              <button className='produtos-button'>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CafeArabica;
