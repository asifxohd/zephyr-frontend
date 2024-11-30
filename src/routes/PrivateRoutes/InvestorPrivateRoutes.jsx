import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserProvider } from '@/src/components/Common/UserContext';

const InvestorPrivateRoutes = () => {
    const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'investor') {
            return <UserProvider><Outlet /></UserProvider>;
        } else {
            return <Navigate to="/investor/login" replace />;
        }
    } else {
        return <Navigate to="/investor/login" replace />;
    }
};

export default InvestorPrivateRoutes;
