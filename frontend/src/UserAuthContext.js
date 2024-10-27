import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [redirectUrl, setRedirectUrl] = useState('/');
    const navigate = useNavigate();

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
        const userToken = localStorage.getItem('userToken');
        if (userToken && checkToken(userToken)) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('userToken');
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);

    const checkAuthentication = () => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        if (userToken && checkToken(userToken)) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('userToken');
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    const loginUser = (token) => {
        if (checkToken(token)) {
            localStorage.setItem('userToken', token);
            setIsAuthenticated(true);
            navigate(redirectUrl);
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