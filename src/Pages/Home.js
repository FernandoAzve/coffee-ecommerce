// src/Home.js
import React from 'react';
import '../Styles/HomeStyles.css';

function Home() {
  return (
    <div className="home-page">
      <div className="top-bar">
        <a href="/dicas">Dicas</a>
        <a href="/certificacoes">Certificações</a>
      </div>
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/cursos">Cursos</a>
          <a href="/arabica">Cafés Arábica</a>
          <a href="/frutados">Cafés Frutados</a>
          <a href="/acessorios">Acessórios</a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>

      <div className="banner">
        BANNER
      </div>

      <section className="mais-comprados">
        <h2>Mais comprados</h2>
        <div className="produtos">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="produto">
              <div className="imagem">IMAGEM</div>
              <p>Café 100% Arábica</p>
              <p>R$ 18,79</p>
              <button>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
