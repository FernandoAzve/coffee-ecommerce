import React from 'react';

function Login() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
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
      <h2>Realize o Login</h2>
      <form style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="email" 
            placeholder="e-mail" 
            style={{
              width: '100%', 
              padding: '10px', 
              marginBottom: '10px',
              borderRadius: '5px'
            }} 
          />
          <input 
            type="password" 
            placeholder="senha" 
            style={{
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px'
            }} 
          />
        </div>
        <button 
          type="submit" 
          style={{
            padding: '10px 20px', 
            borderRadius: '5px', 
            backgroundColor: '#333', 
            color: '#fff', 
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
