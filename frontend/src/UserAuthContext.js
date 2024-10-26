import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importação correta
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Inicialmente está carregando
    const [redirectUrl, setRedirectUrl] = useState('/'); // Adiciona estado para URL de redirecionamento
    const navigate = useNavigate(); // Define navigate usando o hook useNavigate

    // Função para verificar se o token é válido
    const checkToken = (token) => {
        try {
            const decoded = jwtDecode(token); // Usando jwtDecode corretamente
            const currentTime = Date.now() / 1000; // Tempo atual em segundos
            return decoded.exp > currentTime; // Verifica se o token expirou
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return false; // Token inválido
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken && checkToken(userToken)) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('userToken'); // Remove o token expirado ou inválido
            setIsAuthenticated(false);
        }
        setLoading(false); // Define o carregamento como concluído
    }, []);

    const checkAuthentication = () => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        if (userToken && checkToken(userToken)) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('userToken'); // Remove o token expirado ou inválido
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    const loginUser = (token) => {
        if (checkToken(token)) {
            localStorage.setItem('userToken', token);
            setIsAuthenticated(true);
            navigate(redirectUrl); // Redireciona para a URL armazenada após o login
        } else {
            console.error('Token de usuário inválido ou expirado');
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    return (
        <UserAuthContext.Provider value={{ isAuthenticated, loading, loginUser, logoutUser, checkAuthentication, setRedirectUrl }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export const useUserAuth = () => useContext(UserAuthContext);