import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { submitOtpVerificationForm, resendOtp } from '../../services/api/register'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const OtpInvestor = () => {
    
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [otpError, setOtpError] = useState("");
    const [timer, setTimer] = useState(60); 
    const navigate = useNavigate()
    
    const inputStyles = {
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        width: 40,
        height: 40,
        marginRight: '7px',
        borderRadius: 5,
        appearance: 'textfield'
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('investorEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval); 
        }
    }, [timer]);

    
    const handleVerifyOTP = async () => {
        try {
            const data = {
                email: email,
                otp: otp
            };
            const response = await submitOtpVerificationForm(data);
            console.log('OTP verified successfully:', response);
            toast.success("user create successfull please sign in to continue");
            navigate('/investor')
            
        } catch (error) {
            if(error.response?.data.otp){
                setOtpError(error.response.data.otp)
                console.log(error.response.data);
                
            }else{
                toast.error("something went wrong please try again")
            }
            
        }
    };

    const handleResendOTP = async () => {
        try {
            const data = localStorage.getItem('investorEmail')
            await resendOtp(data);
            console.log('OTP resent successfully');
            setTimer(60);
            toast.success('Otp sent successfully');
        } catch (error) {
            console.error('Error resending OTP:', error);
            toast.error(error.response?.data.message)
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Enter The Code</h2>
                <p className=' text-center'>Enter the code we sent to your Email <br /> <span className='text-blue-300'>{email}</span> be careful <br /> not to share the code with anyone </p>
                <div className="text-center mt-2 text-gray-500">
                    <p className='pb-2'> {formatTime(timer)}</p>
                </div>
                <div className="flex justify-center mb-5">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={inputStyles}
                    />
                </div>
                {otpError ? <div className='text-center text-sm pb-2 text-red-500'>{otpError}</div> : ''}
                <div className="flex justify-center">
                    <button onClick={handleVerifyOTP} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none">Verify OTP</button>
                </div>

                <p className='text-center mt-3 text-gray-500'>Didn't Receive an OTP? <br /><button onClick={handleResendOTP} className='text-blue-500 hover:text-blue-700'>Resend OTP</button></p>
            </div>
        </div>
    );
}

export default OtpInvestor;
