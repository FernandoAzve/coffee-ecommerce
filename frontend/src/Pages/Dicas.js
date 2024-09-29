import React from 'react';
import '../Styles/Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Dicas() {
  return (
    <div className="home-page">

      <TopBar />

      <Header />

      <div className="center-content">
        <h1>Dicas e Tutoriais</h1>
        <p className="description">
          Desvende os segredos do café com nossas dicas e tutoriais exclusivo para iniciantes.
        </p>
      </div>

      <div className="videos-container">
        <div className="videos">
          <h2>Tutorial de como moer o café</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Tutorial de como moer o café"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="videos-container">
        <div className="videos">
          <h2>Tutorial de como moer o café</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SEU_VIDEO_ID"
            title="Tutorial de como moer o café"
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
