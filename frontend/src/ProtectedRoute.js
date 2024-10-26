import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { useUserAuth } from './UserAuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { isAdminAuthenticated, loading: adminLoading } = useAdminAuth();
    const { isAuthenticated, loading: userLoading } = useUserAuth();

    console.log('Estado de autenticação do admin:', isAdminAuthenticated);
    console.log('Estado de autenticação do usuário:', isAuthenticated);

    if (adminLoading || userLoading) {
        return <div>Carregando...</div>; // Exibe um indicador de carregamento enquanto verifica a autenticação
    }

    if (role === 'admin') {
        if (!isAdminAuthenticated) {
            console.log('Admin não autenticado, redirecionando para login-admin');
            return <Navigate to="/login-admin" />; // Redireciona para a página de login do admin
        }
    } else {
        if (!isAuthenticated) {
            console.log('Usuário não autenticado, redirecionando para login');
            return <Navigate to="/login" />; // Redireciona para a página de login comum
        }
    }

    return children;
};

export default ProtectedRoute;