import axios from 'axios';
import { BASE_URL } from '../../constents';
import {jwtDecode} from "jwt-decode";

/**
 * Submits the login form data to the server to obtain authentication tokens.
 *
 * @param {Object} data - The login form data, typically containing the username and password.
 * @returns {Promise<Object>} - A promise that resolves to the server's response containing access and refresh tokens.
 * @throws {Error} - Throws an error if the request fails.
 */
export const submitLoginForm = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'api/token/', data);
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        const decodedToken = jwtDecode(access); 
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        return response.data;
    } catch (error) {
        
        throw error;
    }
}

/**
 * Sends user data to the backend for authentication.
 *
 * This function performs an HTTP POST request to the specified endpoint
 * with the provided user data. It is used to authenticate users who have
 * logged in via Google and need their information processed by the backend.
 *
 * @param {Object} userData - The user data to be sent to the backend.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.picture - The URL of the user's profile picture.
 *
 * @returns {Promise<Object>} The response data from the backend.
 *
 * @throws {Error} Throws an error if the API request fails or if there is
 *                 a problem with the network request.
 */
export const sendUserData = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}api/google-login/`, userData);
        const { access, refresh } = response.data.tokens
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        const decodedToken = jwtDecode(access);
        console.log(decodedToken);
         
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        return response.data;
    } catch (error) {
        
        console.error('API request failed:', error);
        throw error;
    }
};