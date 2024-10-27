import React from 'react';
import '../Styles/Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';

function Dicas() {
  return (
    <div className="home-page">
      <Header />
      <div className="center-content">
        <h1>Dicas e Tutoriais</h1>
        <p className="description">
          Desvende os segredos do café com nossas dicas e tutoriais exclusivo para iniciantes.
        </p>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Como moer o café</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZwV0flZT-YU"
            title="Como moer o café"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="videos-container">
        <div className="videos">
          <h2>Como fazer café na prensa francesa</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mCspTWZqOsY"
            title="Como fazer café na prensa francesa"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Dicas;
