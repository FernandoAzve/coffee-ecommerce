import React from 'react';
import { useAuth } from '../AuthContext';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
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
        {!isAuthenticated ? (
          <>
            <a href="/login">Login</a>
            <a href="/cadastro">Cadastre-se</a>
          </>
        ) : (
          <>
            <a href="/meus-pedidos">Meus Pedidos</a>
            <button onClick={logout} className='logout-button'>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;