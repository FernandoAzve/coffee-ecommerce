import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CafeArabica from './Pages/CafeArabica';
import CafeFrutados from './Pages/CafeFrutados';
import Acessorios from './Pages/Acessorios';
import Cursos from './Pages/Cursos';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Certificacoes from './Pages/Certificacoes'
import Dicas from './Pages/Dicas'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/arabica" element={<CafeArabica />} />
        <Route path="/frutados" element={<CafeFrutados />} />
        <Route path="/acessorios" element={<Acessorios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/certificacoes" element={<Certificacoes />} />
        <Route path="/dicas" element={<Dicas />} />
      </Routes>
    </Router>
  );
}

export default App;
