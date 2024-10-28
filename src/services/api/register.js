import axios from 'axios';
import { BASE_URL } from '../../constents';

/**
 * Sends a registration form to the server.
 *
 * @param {Object} data - The registration data to be sent to the server.
 * @returns {Promise<Object>} - The server response.
 * @throws {Error} - If the request fails, an error is thrown.
 */
export const submitRegisterForm = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'api/register-user/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Submits the OTP verification form to the server.
 *
 * @param {Object} data - The OTP verification data to be sent to the server.
 * @returns {Promise<Object>} - The server response.
 * @throws {Error} - If the request fails, an error is thrown.
 */
export const submitOtpVerificationForm = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'api/otp-verification/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Resends the OTP to the user's email.
 *
 * @param {Object} data - The data containing the user's email.
 * @returns {Promise<Object>} - The server response.
 * @throws {Error} - If the request fails, an error is thrown.
 */
export const resendOtp = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${BASE_URL}api/resent-otp/`, {email:data});
        return response.data;
    } catch (error) {
        throw error;
    }
};
