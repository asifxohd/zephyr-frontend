import axiosInstance from "../../interceptors/interceptors";

/**
 * Fetches investor user information from the backend.
 *
 * @param {number} [page=1] - The page number to retrieve (default is 1).
 * @returns {Promise<Object>} - A promise that resolves to an object containing investor user information,
 *                              including results and total count.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchInvestorUserInfo = async (page = 1) => {
    try {
        const response = await axiosInstance.get(`api/fetch-investor-users-info/?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching investor user information:", error);
        throw error;
    }
};

/**
 * Searches for investors based on a query string.
 *
 * @param {string} query - The search term to filter investors by name or email.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the search results,
 *                              including matching investor user information and total count.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchInvestors = async (query) => {
    try {
        const response = await axiosInstance.get(`api/investors/search/?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching for investors:", error);
        throw error;
    }
};


export const individualInvestorUserInfo = async (id) => {
    try {
        const response = await axiosInstance.get(`api/admin-investor-user-info/${id}/`)
        return response.data;
    } catch (error) {
        throw error;
    }
}
