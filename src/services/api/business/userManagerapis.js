import axiosInstance from "../../interceptors/interceptors"

export const fetchInvestrUserInfomationForClient = async (page=1)=> {
    try {
       const response=  await axiosInstance.get(`api/fetch-investors/?page=${page}`)
       return response.data
    } catch (error) {
        throw error
    }
}


export const fetchBuseinessUserInfomationForClient = async (page=1)=> {
    try {
       const response=  await axiosInstance.get(`api/fetch-business-user/?page=${page}`)
       return response.data
    } catch (error) {
        throw error
    }
}