import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    if (!currentUser) {
        // Not authenticated, redirect to login with the current URL as the 'from' location
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If allowedRoles is provided, check if the user has the required role
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <div>Unauthorized</div>; // Or a custom unauthorized component
    }

    // If authenticated and authorized, render the children
    return children;
};

export default ProtectedRoute;