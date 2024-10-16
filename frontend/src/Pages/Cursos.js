import React from 'react';
import '../Styles/Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Cursos() {
  return (
    <div className="home-page">

      <TopBar />

      <Header />

      <div className="center-content">
        <h1>Cursos de Barista</h1>
        <p className="description">
          Aprenda as técnicas e segredos para se tornar um especialista em café. Nossos cursos são
          elaborados para todos os níveis, desde iniciantes até profissionais.
        </p>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 1: Introdução ao Barismo</h2>
          <p>Descrição: Um curso básico para quem está começando na arte do café.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/h5KB_N6J3rI"
            title="Introdução ao Barismo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 2: Técnicas Avançadas de Barismo</h2>
          <p>Descrição: Para quem já tem alguma experiência e quer aprimorar suas habilidades.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oCOUSopZLWg"
            title="Técnicas Avançadas de Barismo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Curso 3: Latte Art</h2>
          <p>Descrição: Aprenda as técnicas para criar incríveis desenhos com leite vaporizado.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sWD7pBJl5Go"
            title="Latte Art"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
