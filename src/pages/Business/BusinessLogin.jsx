import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validations/businessLogin';
import { Link } from 'react-router-dom';
import {submitLoginForm} from '../../services/api/login'
import useAuth from '../../hooks/useAuth'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '@/src/components/investor/ForgotPasswordModal';
import useCustomNavigationForAuthenticatedUser from '@/src/hooks/useCustomNavigationForAuthenticatedUser';

const BusinessLogin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    useCustomNavigationForAuthenticatedUser();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {                
                const response = await submitLoginForm({ username: values.email,password: values.password })
                const role = useAuth();
                if (role == 'business') {
                    navigate('/business')
                    toast.success("User Signed in successfully")
                }else{
                    navigate('/business/login')
                    toast.error("invalid user credentials")
                    localStorage.clear()
                }
            } catch (error) {
                if (error.response?.data.detail){
                    toast.error(error.response?.data.detail)
                }else{
                    console.log(error);
                    
                }
            }
        }
    });
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-60 flex flex-row w-full">
            <div className="hidden md:block md:w-1/2">
                <img
                    className="object-cover w-full h-screen"
                    src="https://plus.unsplash.com/premium_photo-1683140722537-0eb6f05b57d4?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmljZSUyMHRvJTIwbWVldCUyMHlvdXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="login-page-image"
                />
            </div>
            <div className="p-8 max-md:h-screen flex justify-center max-md:items-center md:justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold w-96 max-sm:w-80">Welcome Back!</h2>
                    <p className="text-gray-700 mb-4">Sign in to access your account.</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email" 
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete='email'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password" 
                                autoComplete='current-password'
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
                            >
                                Sign In
                            </button>
                        </div>
                        <div onClick={openModal} className="text-xs text-center text-blue-500 mb-1 cursor-pointer"> <u>forgot password? </u> </div>
                        <p className="text-sm text-center">
                            Not a member yet? <u><Link to="../register" >Register here</Link></u>
                        </p>
                        
                    </form>
                </div>
            </div>
            <ForgotPasswordModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default BusinessLogin;
