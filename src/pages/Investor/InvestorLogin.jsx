import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validations/businessLogin';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { submitLoginForm } from '../../services/api/login';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { sendUserData } from "../../services/api/login";
import ForgotPasswordModal from '../../components/investor/ForgotPasswordModal';
import useCustomNavigationForAuthenticatedUser from '@/src/hooks/useCustomNavigationForAuthenticatedUser';


const InvestorLogin = () => {
    useCustomNavigationForAuthenticatedUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await submitLoginForm({ username: values.email, password: values.password });
                const role = useAuth();
                if (role === 'investor') {
                    navigate('../');
                    toast.success("Sign in successfully");
                } else {
                    localStorage.clear();
                    toast.error("Invalid user credentials");
                }
            } catch (error) {
                if (error.response?.data.detail) {
                    toast.error(error.response?.data.detail);
                } else {
                    console.log(error);
                }
            }
        }
    });

    const handleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const { name, email } = decodedToken;
                const userData = {
                    full_name: name,
                    email: email,
                    role: 'investor'
                };
                const responseData = await sendUserData(userData);
                navigate('../');
            } catch (error) {
                console.error('Failed to decode token or send request:', error);
            }
        } else {
            console.error('No token found in credential response');
        }
    };

    const handleLoginError = () => {
        console.log('Login Failed');
        toast.error("Try again after some time");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2">
                    <img
                        className="object-cover w-full max-md:h-56 h-full"
                        src="https://images.pexels.com/photos/9454915/pexels-photo-9454915.jpeg?cs=srgb&dl=pexels-mo-eid-1268975-9454915.jpg&fm=jpg"
                        alt="login-page-image"
                    />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Welcome Back!</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">Please sign in to your account</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`mt-2 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                autoComplete='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                required
                            />
                            {/* Validation Error for Email */}
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs ">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className={`mt-2 p-2 block w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                autoComplete='current-password'
                                required
                            />
                            {/* Validation Error for Password */}
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-xs ">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-2">
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 mt-3 focus:ring-blue-600">Sign In</button>
                        </div>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                            width='380'
                            logo_alignment='center'
                        />
                        <p
                            className="text-center mt-2 text-sm text-blue-500 cursor-pointer"
                            onClick={openModal}>
                            <u>Forgot your password?</u>
                        </p>
                        <p className="text-center mt-2 text-sm text-gray-500">Don't have an account? <u><Link to="/investor/register" className="text-blue-500 hover:text-blue-700">Register here</Link></u></p>
                        <ForgotPasswordModal isOpen={isModalOpen} onRequestClose={closeModal} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InvestorLogin;
