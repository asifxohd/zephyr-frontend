import axiosInstance from "../../interceptors/interceptors";
/**
 * Updates the user profile with the provided data.
 *
 * @param {Object} values - The data to update the user profile with.
 * @returns {Promise<Object>} - The response data from the API call.
 */
export const updateUserProfile = async (values) => {
    const formData = new FormData();
    
    formData.append('full_name', values.fullName);
    formData.append('phone_number', values.phoneNumber);
    formData.append('description', values.description);

    const locationIds = values.location.map(item => parseInt(item.value, 10));
    const industryIds = values.industry.map(item => parseInt(item.value, 10));

    formData.append('preferred_locations', JSON.stringify(locationIds)); 
    formData.append('preferred_industries', JSON.stringify(industryIds)); 

    if (values.avatarImage) {
        formData.append('avatar_image', values.avatarImage);
    }
    if (values.coverImage) {
        formData.append('cover_image', values.coverImage);
    }

    const response = await axiosInstance.put('api/user/update/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
