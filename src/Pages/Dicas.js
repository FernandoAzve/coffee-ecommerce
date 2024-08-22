import React from 'react';

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
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>
      <h1>Dicas e Tutoriais</h1>
      <p>
        Desvende os segredos do café com nossas dicas e tutoriais exclusivo para iniciantes.
      </p>

      <div style={{ marginTop: '20px' }}>
        <h2>Tutorial de como moer corretamente o café</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/SEU_VIDEO_ID"
          title="Tutorial de como moer corretamente o café"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div style={{ marginTop: '20px' }}>
      <h2>Tutorial de como moer corretamente o café</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/SEU_VIDEO_ID"
          title="Tutorial de como moer corretamente o café"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Dicas;
