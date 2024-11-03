import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from './UserAuthContext';
import { AdminAuthProvider } from './AdminAuthContext';
import Home from './Pages/Home';
import Cursos from './Pages/Cursos';
import CafeArabica from './Pages/CafeArabica';
import CafeFrutados from './Pages/CafeFrutados';
import Acessorios from './Pages/Acessorios';
import Carrinho from './Pages/Carrinho';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Certificacoes from './Pages/Certificacoes';
import Dicas from './Pages/Dicas';
import FinalizarPedido from './Pages/FinalizarPedido';
import MeusPedidos from './Pages/MeusPedidos';
import LoginAdmin from './Pages/LoginAdmin';
import UsuariosAdmin from './Pages/UsuariosAdmin';
import PedidosAdmin from './Pages/PedidosAdmin';
import EstoqueAdmin from './Pages/EstoqueAdmin';
import AcessoPrivilegiado from './Pages/AcessoPrivilegiado';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './Components/NotFound';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <UserAuthProvider>
        <AdminAuthProvider>
          <div className="app-container">
            <div className="content">
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
                <Route path="/carrinho" element={
                  <ProtectedRoute role="user">
                    <Carrinho />
                  </ProtectedRoute>
                } />
                <Route path="/finalizar-pedido" element={
                  <ProtectedRoute role="user">
                    <FinalizarPedido />
                  </ProtectedRoute>
                } />
                <Route path="/meus-pedidos" element={
                  <ProtectedRoute role="user">
                    <MeusPedidos />
                  </ProtectedRoute>
                } />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/usuarios-admin" element={
                  <ProtectedRoute role="admin">
                    <UsuariosAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/pedidos-admin" element={
                  <ProtectedRoute role="admin">
                    <PedidosAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/estoque-admin" element={
                  <ProtectedRoute role="admin">
                    <EstoqueAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/acesso-privilegiado" element={
                  <ProtectedRoute role="admin">
                    <AcessoPrivilegiado />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </AdminAuthProvider>
      </UserAuthProvider>
    </Router>
  );
}

export default App;