import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FinalizarPedido() {
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
          <a href="/carrinho">
            <i className="bi bi-cart"></i>
          </a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>
      <h2 className="center-content">Finalizar pedido</h2>
      <form style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Endereço de entrega"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Número"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Bairro"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Cidade"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="CEP"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <input
            type="text"
            placeholder="Complemento"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          />
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <label>Esse pedido é para presente?</label>
            <div>
              <label>
                <input type="radio" name="presente" value="sim" style={{ marginRight: '5px' }} />
                Sim
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input type="radio" name="presente" value="nao" style={{ marginRight: '5px' }} />
                Não
              </label>
            </div>
          </div>
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
            Finalizar pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default FinalizarPedido;
