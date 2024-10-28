import axios from 'axios';
import { BASE_URL } from '../../constents';
import axiosInstance from '../interceptors/interceptors';
/**
 * Fetch combined location and industry data from the server.
 * @returns {Promise<Object>} The combined data containing locations and industries.
 */
export const fetchCombinedData = async () => {
  try {
    const response = await axiosInstance.get('api/combined-location-industry/');
    return response.data;
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw error; 
  }
};

/**
 * Fetch user information from the server.
 * @returns {Promise<Object>} The user information.
 */
export const fetchUserInfo = async () => {
    
    try {
      const response = await axiosInstance.get('api/investor-user-info/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error; 
    }
  };