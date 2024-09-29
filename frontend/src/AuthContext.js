import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica o localStorage ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Função de login
  const login = (token) => {
    localStorage.setItem('token', token); // Armazena o token no localStorage
    setIsAuthenticated(true);
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}