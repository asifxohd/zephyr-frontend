// src/api.js
import axiosInstance from "../../interceptors/interceptors";

export const uploadVideo = async (formData) => {
    try {
        const response = await axiosInstance.post('api/business-upload-video/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};
