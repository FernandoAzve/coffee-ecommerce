import React from 'react';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    // Lógica de autenticação aqui
    login();
  };

  return (
    <div className="home-page">

      <TopBar />

      <Header />

      <h2 className="text-center mb-4 mt-4">Realize o Login</h2>
      <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 py-2">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;