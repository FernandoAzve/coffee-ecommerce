import React from 'react';
import '../Styles/Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cursos() {
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
        <h1>Cursos de Barista</h1>
        <p className="description">
          Aprenda as técnicas e segredos para se tornar um especialista em café. Nossos cursos são
          elaborados para todos os níveis, desde iniciantes até profissionais.
        </p>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 1: Introdução ao Barismo</h2>
          <p>Descrição: Um curso básico para quem está começando na arte do café.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Introdução ao Barismo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 2: Técnicas Avançadas de Barismo</h2>
          <p>Descrição: Para quem já tem alguma experiência e quer aprimorar suas habilidades.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Técnicas Avançadas de Barismo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 3: Latte Art</h2>
          <p>Descrição: Aprenda as técnicas para criar incríveis desenhos com leite vaporizado.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Latte Art"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
