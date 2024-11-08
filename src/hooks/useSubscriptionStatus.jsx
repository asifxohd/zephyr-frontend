import { useEffect, useState } from "react";
import axiosInstance from "../services/interceptors/interceptors";

const useSubscriptionStatus = ()=> {
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [freeTrialUsed, setFreeTrialUsed] = useState(null);

    useEffect(()=> {
        const fetchSubscriptionStatus = async ()=> {
            try {
                const response = await axiosInstance.get('api/check-subscription/')
                // console.log(response.data);
                setIsSubscribed(response.data.isSubscribed)
                setFreeTrialUsed(response.data.freeTrialUsed)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSubscriptionStatus();
    }, [])
    return { isSubscribed, freeTrialUsed };
}

export default useSubscriptionStatus;
