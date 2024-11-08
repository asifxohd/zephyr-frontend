import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';  // Correctly import jwtDecode
import { useNavigate } from 'react-router-dom';

const useCustomNavigationForAuthenticatedUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    

    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.role === 'admin') {
        navigate('/admin');
      } else if (decodedToken.role === 'investor') {
        navigate('/investor');
      } else if (decodedToken.role === 'business') {
        navigate('/business');
      } else { 
        navigate('/');
      }
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('');
    }
  }, [navigate]);
};

export default useCustomNavigationForAuthenticatedUser;
