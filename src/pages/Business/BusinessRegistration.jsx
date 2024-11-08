import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../../utils/validations/register';
import { submitRegisterForm } from '../../services/api/register';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import useCustomNavigationForAuthenticatedUser from '@/src/hooks/useCustomNavigationForAuthenticatedUser';


const BusinessRegistration = () => {
    useCustomNavigationForAuthenticatedUser();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await submitRegisterForm({
                    username: values.email,
                    full_name: values.name,
                    email: values.email,
                    phone_number: values.phoneNumber,
                    password: values.password,
                    confirm_password: values.confirmPassword,
                    role: 'business'
                });
                toast.success(response.message)
                localStorage.setItem('businessEmail', values.email)
                navigate('../otp-verification')

            } catch (error) {
                console.log(error);

                if (error.response.data) {
                    setError(error.response.data)
                }
                toast.error("something went wrong try again after some time")
            } finally {
                setLoading(false)
            }
        }
    });

    return (
        <div className="bg-gray-60 flex flex-row w-full">
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-screen" src="https://plus.unsplash.com/premium_photo-1683140722537-0eb6f05b57d4?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmljZSUyMHRvJTIwbWVldCUyMHlvdXxlbnwwfHwwfHx8MA%3D%3D" alt="registration-page-image" />
            </div>
            <div className="p-8 max-md:h-screen flex justify-center max-md:items-center md:justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold w-96 max-sm:w-80">Register</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your business name"
                                autoComplete="organization"
                                className={`mt-2 p-2 block w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                className={`mt-2 p-2 block w-full border ${formik.touched.email && (formik.errors.email || error.email) ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                            {error.email ? (
                                <div className="text-red-500 text-sm">{error.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Enter your phone number"
                                autoComplete="tel"
                                className={`mt-2 p-2 block w-full border ${formik.touched.phoneNumber && (formik.errors.phoneNumber || error.phone_number) ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                required
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                            ) : null}
                            {error.phone_number ? (
                                <div className="text-red-500 text-sm">{error.phone_number}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="new-password"
                                className={`mt-2 p-2 block w-full border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                            {error.password ? (
                                <div className="text-red-500 text-sm">{error.password}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                className={`mt-2 p-2 block w-full border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                required
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
                            >
                                {
                                    loading ?
                                        <PulseLoader
                                            color="#ffffff"
                                            loading={loading}
                                            size={8}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        :
                                        'Register'
                                }
                            </button>
                        </div>
                        <p className="text-sm">Already have an Account? <u><Link to="/business/login">Sign in</Link></u></p>
                    </form>
                    </div>

            </div>
        </div>
    );
};

export default BusinessRegistration;
