import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';  // Correctly import jwtDecode
import { useNavigate } from 'react-router-dom';

const useCustomNavigationForAuthenticatedUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decodedToken = localStorage.getItem('decodedToken');
      const tokenObject = JSON.parse(decodedToken);

      
      if (tokenObject.role === 'admin') {
        navigate('/admin');
      } else if (tokenObject.role === 'investor') {
        navigate('/investor');
      } else if (tokenObject.role === 'business') {
        navigate('/business');
      } else { 
        navigate('/');
      }
    } catch (error) {
      console.error('No token', error);
      navigate('');
    }
  }, [navigate]);
};

export default useCustomNavigationForAuthenticatedUser;
