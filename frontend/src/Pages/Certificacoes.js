import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/CertificacoesStyles.css';
import Header from '../Components/Header';


function Certificacoes() {
  return (
    <div className="home-page">
      <Header />
      <div className="center-content">
        <h1>Certificações</h1>
        <p className="description">
          Explore nosso compromisso com a sustentabilidade e a qualidade por meio de nossas certificações e práticas responsáveis.
        </p>
      </div>
      <div className="certificacoes-container">
        <div className="certificacao-item">
          <img src="/cert_iso9001.png" alt="Certificado ISO 9001" className="certificacao-img" />
        </div>
        <div className="certificacao-item">
          <img src="/cert_organico.png" alt="Certificado Orgânico" className="certificacao-img" />
        </div>
        <div className="certificacao-item">
          <img src="/cert_rainforest.png" alt="Certificado Rainforest" className="certificacao-img" />
        </div>
      </div>

    </div>
  );
}

export default Certificacoes;