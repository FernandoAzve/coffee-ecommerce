import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Pages/Home';
import CafeArabica from './Pages/CafeArabica';
import CafeFrutados from './Pages/CafeFrutados';
import Acessorios from './Pages/Acessorios';
import Cursos from './Pages/Cursos';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Certificacoes from './Pages/Certificacoes';
import Dicas from './Pages/Dicas';
import Carrinho from './Pages/Carrinho';
import FinalizarPedido from './Pages/FinalizarPedido';
import MeusPedidos from './Pages/MeusPedidos';
import LoginAdmin from './Pages/LoginAdmin';
import UsuariosAdmin from './Pages/UsuariosAdmin';
import PedidosAdmin from './Pages/PedidosAdmin';
import EstoquetoAdmin from './Pages/EstoqueAdmin';
import AcessoPrivilegiado from './Pages/AcessoPrivilegiado';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/arabica" element={<CafeArabica />} />
          <Route path="/frutados" element={<CafeFrutados />} />
          <Route path="/acessorios" element={<Acessorios />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/certificacoes" element={<Certificacoes />} />
          <Route path="/dicas" element={<Dicas />} />
          <Route path="/finalizar-pedido" element={<FinalizarPedido />} />
          <Route path="/meus-pedidos" element={<MeusPedidos />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
          <Route path="/pedidos-admin" element={<PedidosAdmin />} />
          <Route path="/estoque-admin" element={<EstoquetoAdmin />} />
          <Route path="/acesso-privilegiado" element={<AcessoPrivilegiado />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
