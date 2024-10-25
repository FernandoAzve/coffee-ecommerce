import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importação nomeada correta

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Função para verificar se o token é válido
  const checkToken = (token) => {
    try {
      const decoded = jwtDecode(token); // Usando jwtDecode corretamente
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      return decoded.exp > currentTime; // Verifica se o token expirou
    } catch (error) {
      return false; // Token inválido
    }
  };

  useEffect(() => {
    // Verifica o token de usuário comum
    const userToken = localStorage.getItem('userToken');
    if (userToken && checkToken(userToken)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userToken'); // Remove o token expirado ou inválido
      setIsAuthenticated(false);
    }

    // Verifica o token de administrador
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && checkToken(adminToken)) {
      setIsAdminAuthenticated(true);
    } else {
      localStorage.removeItem('adminToken'); // Remove o token expirado ou inválido
      setIsAdminAuthenticated(false);
    }
  }, []);

  const loginUser = (token) => {
    if (checkToken(token)) {
      localStorage.setItem('userToken', token);
      setIsAuthenticated(true);
    } else {
      console.error('Token de usuário inválido ou expirado');
    }
  };

  const loginAdmin = (token) => {
    if (checkToken(token)) {
      localStorage.setItem('adminToken', token);
      setIsAdminAuthenticated(true);
    } else {
      console.error('Token de administrador inválido ou expirado');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminAuthenticated,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}