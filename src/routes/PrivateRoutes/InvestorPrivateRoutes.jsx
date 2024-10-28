import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const InvestorPrivateRoutes = () => {
    const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'investor') {
            return <Outlet />;
        } else {
            return <Navigate to="/investor/login" replace />;
        }
    } else {
        return <Navigate to="/investor/login" replace />;
    }
};

export default InvestorPrivateRoutes;
