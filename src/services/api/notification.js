import { BASE_URL } from "@/src/constents";
import axiosInstance from "../interceptors/interceptors";


export const handleListNotifications = async ()=> {
    try {
        const response = axiosInstance.get(BASE_URL+'api/notifications/')
        return response
    } catch (error) {
        throw error
    }
};