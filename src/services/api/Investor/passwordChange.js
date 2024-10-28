import { toast } from "react-toastify";
import axiosInstance from "../../interceptors/interceptors";

/**
 * Sends a request to change the user's password.
 *
 * @param {Object} data - An object containing the password change details.
 * @param {string} data.currentPassword - The user's current password.
 * @param {string} data.newPassword - The new password the user wants to set.
 * @param {string} data.confirmPassword - Confirmation of the new password.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} Throws an error if the password change fails.
 */

export const handleChangePasswordFormSubmition = async (data) => {
    try {
        const response = await axiosInstance.put('/api/change-password/', data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.current_password || 'Failed to change password');
    }
};
