import { BASE_URL } from '../../constents';
import axios from 'axios';

/**
 * Fetches a new access token using the stored refresh token.
 *
 * @returns {Promise<string>} - A promise that resolves to the new access token.
 * @throws {Error} - Throws an error if the request fails or if no refresh token is available.
 */
export const fetchNewAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        const response = await axios.post(BASE_URL + 'api/token/refresh/', { refresh: refreshToken });
        return response;
    } catch (error) {
        throw error;
    }
}
