import axiosInstance from "../../interceptors/interceptors";

export const toggleUserStatus = (userId)=> {
    try {
        const response = axiosInstance.patch(`api/update-user-status/${userId}/`)
        return response.data
    } catch (error) {
        throw error;
    }
}

