import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../Components/Footer';
import { useAdminAuth } from '../AdminAuthContext';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_adm: email,
          senha_adm: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        loginAdmin(data.token);
        navigate('/pedidos-admin');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo-container">
          <img src="/logo_cafe_mania.png" alt="Logo" className="logo-img" />
        </div>      </header>
      <h2 className="center-content">Admin</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
            required
          />
          <input
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
            }}
            required
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#333',
              color: '#fff',
              cursor: 'pointer',
            }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default LoginAdmin;