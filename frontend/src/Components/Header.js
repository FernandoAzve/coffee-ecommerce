import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext';
import '../Styles/HeaderStyles.css';

function Header() {
  const { isAuthenticated, logoutUser } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="/logo_cafe_mania.png" alt="Logo" className="logo-img" />
        </Link>
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
              <button onClick={handleLogout} className='logout-button'>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;