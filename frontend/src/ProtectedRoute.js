import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAdminAuthenticated, loading } = useAdminAuth();

    console.log('Estado de autenticação do admin:', isAdminAuthenticated);

    if (loading) {
        return <div>Carregando...</div>; // Exibe um indicador de carregamento enquanto verifica a autenticação
    }

    if (!isAdminAuthenticated) {
        console.log('Admin não autenticado, redirecionando para login');
        return <Navigate to="/login-admin" />;
    }

    return children;
};

export default ProtectedRoute;