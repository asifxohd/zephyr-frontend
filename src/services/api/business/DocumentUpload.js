import axiosInstance from "../../interceptors/interceptors";

/**
 *
 * @param {FormData} formData - The FormData object containing document data.
 * @returns {Promise<Object>} - Returns a promise that resolves to the response data from the server.
 * @throws {Error} - Throws an error if the request fails.
 */

export const uploadDocument = async (formData) => {
    try {
        const response = await axiosInstance.post('api/upload-document/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; 
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error; 
    }
};
