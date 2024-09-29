import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Certificacoes() {
  return (
    <div className="home-page">

      <TopBar />

      <Header />

      <div className="center-content">
        <h1>Certificações</h1>
        <p className="description">
          Explore nosso compromisso com a sustentabilidade e a qualidade por meio de nossas certificações e práticas responsáveis. Descubra cafés provenientes de fontes éticas e ambientalmente conscientes, garantindo não apenas uma xícara excepcional, mas também um impacto positivo no mundo do café.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <div style={{
          width: '150px',
          height: '150px',
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px'
        }}>
          <span>Certificação 1</span>
        </div>
        <div style={{
          width: '150px',
          height: '150px',
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px'
        }}>
          <span>Certificação 2</span>
        </div>
        <div style={{
          width: '150px',
          height: '150px',
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px'
        }}>
          <span>Certificação 3</span>
        </div>
      </div>
    </div>
  );
}

export default Certificacoes;
