import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LoginAdmin() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">LOGO</div>
      </header>
      <h2 className="center-content">Admin</h2>
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
        <div style={{ textAlign: 'center' }}>
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
        </div>
      </form>
    </div>
  );
}

export default LoginAdmin;
