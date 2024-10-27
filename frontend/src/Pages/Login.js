import React, { useState } from 'react';
import { useUserAuth } from '../UserAuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_cliente: email,
          senha_cliente: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login bem-sucedido!');
        setError('');
        localStorage.setItem('userToken', data.token);
        loginUser(data.token);
        navigate('/');
      } else {
        setError(data.error || 'Erro ao tentar fazer login');
        setSuccess('');
      }
    } catch (err) {
      setError('Erro ao tentar fazer login');
      setSuccess('');
    }
  };

  return (
    <div className="home-page">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 py-2">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;