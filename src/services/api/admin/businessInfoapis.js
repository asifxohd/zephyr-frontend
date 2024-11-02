import axiosInstance from "../../interceptors/interceptors";

export const fetchBusinessUsers = async (page=1) => {
    try {
        const response = await axiosInstance(`api/admin/business-users/?page=${page}`)
        return response.data
    } catch (error) {
        throw error
    }
}


/**
 * Searches for investors based on a query string.
 *
 * @param {string} query - The search term to filter investors by name or email.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the search results,
 *                              including matching investor user information and total count.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchBusiness = async (query) => {
    try {
        const response = await axiosInstance.get(`api/admin/business/search/?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching for investors:", error);
        throw error;
    }
};


export const getIndividualBusinessInfo = async (id) => {
    try {
        const response = await axiosInstance.get(`api/admin/business/individual-business-info/${id}/`)
        return response.data;
    } catch (error) {
        throw error;
    }
}