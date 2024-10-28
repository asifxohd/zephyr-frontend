import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { sendUserData } from "../../services/api/login";
import { useNavigate } from "react-router-dom";

export const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const { name, email } = decodedToken;
            const userData = {
                full_name: name,
                email: email,
                role:'investor'
            }
            const responseData = await sendUserData(userData);
            
        } catch (error) {
            console.error('Failed to decode token or send request:', error);
        }
    } else {
        console.error('No token found in credential response');
    }
};

export const handleLoginError = () => {
    console.log('Login Failed');
    toast.error("try again after some time")
};