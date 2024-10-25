import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAdminAuthenticated } = useAuth();

    if (!isAdminAuthenticated) {
        return <Navigate to="/login-admin" />;
    }

    return children;
};

export default ProtectedRoute;