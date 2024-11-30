import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './components/Common/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={process.env.VITE_GoogleOAuthProviderClientId}>
        <ToastContainer />
        <UserProvider>
            <App />
        </UserProvider>
    </GoogleOAuthProvider>
);
