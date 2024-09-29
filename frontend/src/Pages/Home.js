import React from 'react';
import '../Styles/HomeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';
import { AuthProvider } from '../AuthContext';

function Home() {
  return (
    <AuthProvider>
      <div className="home-page">
        <TopBar />
        <Header />
        <div className="banner">BANNER</div>
        <section className="mais-comprados">
          <h2 className="center-content">Mais comprados</h2>
          <div className="produtos">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="produto">
                <div className="imagem">IMAGEM</div>
                <p>Café 100% Arábica</p>
                <p>R$ 18,79</p>
                <button className="produtos-button">Adicionar ao Carrinho</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AuthProvider>
  );
}

export default Home;