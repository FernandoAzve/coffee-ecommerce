import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return false;
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && checkToken(adminToken)) {
      console.log('Token válido, autenticando admin');
      setIsAdminAuthenticated(true);
    } else {
      console.log('Token inválido ou expirado, redirecionando para login');
      localStorage.removeItem('adminToken');
      setIsAdminAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const loginAdmin = (token) => {
    if (checkToken(token)) {
      localStorage.setItem('adminToken', token);
      setIsAdminAuthenticated(true);
      console.log('Admin autenticado com sucesso');
    } else {
      console.error('Token de administrador inválido ou expirado');
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    console.log('Admin deslogado');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);