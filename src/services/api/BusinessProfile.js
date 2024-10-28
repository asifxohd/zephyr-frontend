import axios from 'axios';
import axiosInstance from '../interceptors/interceptors'

/**
 * Function to update business preferences
 * @param {Object} data - The data to be sent to the API
 * @returns {Object} - The API response data
 * @throws Will throw an error if the request fails
 */
const updateBusinessPreferences = async (data) => {
    try {
        const response = await axiosInstance.post('api/business-preferences/', data);
        return response.data;
    } catch (error) {
        // Throw error if the request fails
        throw error;
    }
};


/**
 * Function to fetch business preferences
 * @returns {Object} - The API response data
 * @throws Will throw an error if the request fails
 */
const fetchBusinessPreferences = async () => {
    try {
        const response = await axiosInstance.get('api/business-preferences/');
        return response.data;
    } catch (error) {
        // Throw error if the request fails
        throw error;
    }
};


export { updateBusinessPreferences, fetchBusinessPreferences };
