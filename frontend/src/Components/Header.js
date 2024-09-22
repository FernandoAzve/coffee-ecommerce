import React from 'react';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const { isAuthenticated } = useAuth();

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
        <a href="/login">Login</a>
        {isAuthenticated ? (
          <a href="/meus-pedidos">Meus pedidos</a>
        ) : (
          <a href="/cadastro">Cadastre-se</a>
        )}
      </nav>
    </header>
  );
};

export default Header;