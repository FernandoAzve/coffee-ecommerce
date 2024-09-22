import React from 'react';
import '../Styles/Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dicas() {
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
          <a href="/carrinho">
            <i className="bi bi-cart"></i>
          </a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>
      <div className="center-content">
        <h1>Dicas e Tutoriais</h1>
        <p className="description">
          Desvende os segredos do café com nossas dicas e tutoriais exclusivo para iniciantes.
        </p>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Tutorial de como moer o café</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Tutorial de como moer o café"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="videos-container">
        <div className="videos">
          <h2>Tutorial de como moer o café</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Tutorial de como moer o café"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Dicas;
