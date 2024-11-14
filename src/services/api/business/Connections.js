import axiosInstance from "../../interceptors/interceptors";


export const handleFollow = async (id) => {
    try {
        const response = await axiosInstance.post(`/api/users/${id}/follow/`);
        return response.data
    } catch (error) {
        throw error
    }
};

export const handleUnfollow = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/users/${id}/follow/`);
        return response.data
    } catch (error) {
        throw error
    }
};

export const checkFollowStatus = async (id) => {
    try {
      const response = await axiosInstance.get(`api/check-follow-status/${id}/`);
      return response.data.is_following;
    } catch (error) {
      console.error('Error checking follow status:', error);
      throw error;
    }
  };


export const fetchUserConnections = async () => {
    try {
      const response = await axiosInstance.get(`api/user-connections/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user connections (followers & following):', error);
      throw error;
    }
  };

  export const fetchFollowingAndUnfollowingForUser = async (id) => {
    try {
      const response = await axiosInstance.get(`api/user-social-network/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user connections (followers & following):', error);
      throw error;
    }
  };
  
  
  export const fetchFollowSuggessions = async () => {
    try {
      const response = await axiosInstance.get(`api/suggested-users/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user connections (followers & following):', error);
      throw error;
    }
  };
  
  
