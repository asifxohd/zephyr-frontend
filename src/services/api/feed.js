import axiosInstance from "../interceptors/interceptors"

export const handlePostUpload = async (formData) => {
    try {
        const response = await axiosInstance.post('api/feed/posts/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export const getPosts = async () => {
    try {
        const response = await axiosInstance.get('api/feed/posts/')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCommentsOfThePost = async (post_id) => {
    try {
        const response = await axiosInstance.get(`api/feed/posts/${post_id}/comments/`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const sendCommentToServer = async (data) => {
    console.log(data);
    
    try {
        const response = await axiosInstance.post('api/feed/comments/', data)
        return response.data
    } catch (error) {
        throw error
    }
}


export const toggleLikePost = async (data) => {
    console.log(data);
    try {
        const response = await axiosInstance.post('api/feed/toggle-like/', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getPersonalPosts = async () => {
    try {
        const response = await axiosInstance.get('api/feed/user/posts/')
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const handleConfirmPostDelete = async (postId)=> {
    try {
        const response = await axiosInstance.delete(`api/feed/posts/${postId}/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const handleUpdateIndividualPost = async (postId, data)=> {
    try {
        const response = await axiosInstance.put(`api/feed/posts/${postId}/`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}




export const getAllPostFromServer = async ()=> {
    try {
        const response = await axiosInstance.get(`api/feed/posts/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}