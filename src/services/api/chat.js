import axiosInstance from "../interceptors/interceptors"

export const fetchMessagingUsers = async () => {
    try {
        const response = await axiosInstance.get('api/chat/user/messages/');
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const fetchConversationMessages = async (userId) => {
    try {
        const response = await axiosInstance.get(`api/chat/messages/${userId}/`);
        return response.data.messages; 
    } catch (error) {
        console.error("Error fetching conversation messages:", error);
        return [];
    }
};
