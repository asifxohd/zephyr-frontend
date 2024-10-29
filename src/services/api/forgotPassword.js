import axiosInstance from "../interceptors/interceptors";


/**
 * Sends a password reset request to the server.
 *
 * @param {string} email - The email address to send the reset link.
 * @returns {Promise} - The response from the server.
 */
export const sendPasswordResetEmail = async (email) => {
    try {
        const response = await axiosInstance.post('api/forgot-password/', { email });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};


