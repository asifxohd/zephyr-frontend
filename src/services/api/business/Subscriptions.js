import axiosInstance from '../../interceptors/interceptors';

export const createCheckoutSession = async (planType) => {
  try {
    const response = await axiosInstance.post(`api/create-checkout-session/${planType}/`);
    console.log(planType)
    console.log(response)
    return response.data.checkout_url;
  } catch (error) {
    console.error("Error initiating checkout session:", error);
    throw error;  
  }
};

export const fetchSubscriptionInformation = async () => {
  try {
    const response = await axiosInstance.get(`api/subscription/info/`);
    return response;
  } catch (error) {
    throw error;  
  }
};



export const cancelSubscriptionConfirm = async () => {
  try {
    const response = await axiosInstance.post(`api/subscription/cancel/`);
    return response;
  } catch (error) {
    throw error;  
  }
};
