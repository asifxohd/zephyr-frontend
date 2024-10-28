import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.VITE_GoogleOAuthProviderClientId}>
    <ToastContainer />
        <App />

    </GoogleOAuthProvider>
  </React.StrictMode>
);
