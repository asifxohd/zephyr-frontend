import axiosInstance from "../../interceptors/interceptors";

/**
 * Fetch data from the given endpoint.
 * @returns {Promise<Object>} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchData = async () => {
	try {
		const response = await axiosInstance.get("api/business-profile-info/");
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const deleteDocument = async ( documentId ) => {
	try {
		const response = await axiosInstance.delete(`api/delete-document/${documentId}/`);
		return response.data
	} catch (error) { 
		console.error('Error deleting document:', error);
        throw error; 
	}
};
