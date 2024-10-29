import axios from 'axios'; // Import Axios for making HTTP requests
import { BASE_URL } from '../../constents';

/**
 * Function to validate the password reset token.
 * 
 * @returns {Promise<boolean>} - Returns true if the token is valid, otherwise false.
 */
export const validateToken = async (token) => {
  try {
    const response = await axios.post(BASE_URL+'api/validate-token/', {token}); 
    return response.data.success; 
  } catch (error) {
    console.error('Error validating token:', error);
    return false; 
  }
};

export const updateForgotPassword = async (token, newPassword) => {
    const response = await axios.post(`${BASE_URL}api/reset-password/`, {
        token,
        new_password: newPassword, 
    });
    return response.data; 
};


