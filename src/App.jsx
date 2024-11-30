import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Starting from './pages/Common/Starting';
import ChangePassword from './pages/Common/changePassword';
import axiosInstance from './services/interceptors/interceptors';
import PermissionRevoked from './components/Alerts/PermissionRevoked';
import GlobalLoader from './components/Suspence/GlobalLoader';
import { UserProvider } from './components/Common/UserContext';


const BusinessRoutes = lazy(() => import("./routes/BusinessRoutes"));
const InvestorRoutes = lazy(() => import("./routes/InvestorRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

function App() {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 403) {
                    localStorage.clear()
                    setShowFallback(true);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<GlobalLoader/>}>
                {showFallback ? (
                    <PermissionRevoked />
                ) : (
                    <Routes>
                        <Route path="change/password/:token/" element={<ChangePassword />} />
                        <Route path="/" element={<Starting />} />
                        <Route path="business/*" element={<BusinessRoutes />} />
                        <Route path="investor/*" element={<InvestorRoutes />} />
                        <Route path="admin/*" element={<AdminRoutes />} />
                    </Routes>
                )}
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
