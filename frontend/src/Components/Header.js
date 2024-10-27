import React from 'react';
import { useUserAuth } from '../UserAuthContext';
import '../Styles/HeaderStyles.css';

function Header() {
  const { isAuthenticated, logoutUser } = useUserAuth();

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo_cafe_mania.png" alt="Logo" className="logo-img" />
      </div>
      <div className="nav-container">
        <div className="top-bar">
          <a href="/dicas">Dicas</a>
          <a href="/certificacoes">Certificações</a>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/cursos">Cursos</a>
          <a href="/arabica">Cafés Arábica</a>
          <a href="/frutados">Cafés Frutados</a>
          <a href="/acessorios">Acessórios</a>
          {!isAuthenticated ? (
            <>
              <a href="/login">Login</a>
              <a href="/cadastro">Cadastre-se</a>
            </>
          ) : (
            <>
              <a href="/meus-pedidos">Meus Pedidos</a>
              <a href="/carrinho">
                <i className="bi bi-cart"></i>
              </a>
              <button onClick={logoutUser} className='logout-button'>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;