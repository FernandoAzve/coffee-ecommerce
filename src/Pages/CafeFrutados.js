import React from 'react';
import '../Styles/CafeStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CafeFrutados() {
  return (
    <div className="cafe-page">
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
          <a href="/carrinho">
            <i className="bi bi-cart"></i>
          </a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>

      <div className="center-content">
        <h1>Cafés Frutados</h1>
        <p className="description">
          Explore a vibrante diversidade dos cafés frutados. Delicie-se com notas frescas e exóticas em cada gole.
        </p>
      </div>

      <section className="mais-comprados">
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

export default CafeFrutados;
