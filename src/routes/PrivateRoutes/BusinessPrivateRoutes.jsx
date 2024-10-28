import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

const BusinessPrivateRoutes = () => {
  const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'business') {
            return <Outlet />;
        } else {
            return <Navigate to="/business/login" replace />;
        }
    } else {
        return <Navigate to="/business/login" replace />;
    }
}

export default BusinessPrivateRoutes