import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    if (!isAuthenticated()) {
        // Redirect to login page if not authenticated, preserving the intended destination
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
