import { useFormik } from 'formik';
import React, { useState } from 'react';
import { registerValidationSchema } from '../../utils/validations/register'
import { submitRegisterForm } from '../../services/api/register';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

const InvestorRegister = () => {
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

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
                    role: 'investor'
                });
                toast.success(response.message)
                localStorage.setItem('investorEmail', values.email)
                navigate('../otp-verification')

            } catch (error) {
                if (error.response.data){
                    setError(error.response.data)
                }else{
                    toast.error("something went wrong try again")
                }
            }finally{
                setLoading(false)
            }
        }
    })



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2">
                    <img
                        className="object-cover w-full max-md:h-56 h-full"
                        src="https://images.pexels.com/photos/9454915/pexels-photo-9454915.jpeg?cs=srgb&dl=pexels-mo-eid-1268975-9454915.jpg&fm=jpg"
                        alt="registration-page-image"
                    />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Register</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className={`mt-2 p-2 block w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                autoComplete='name'
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`mt-2 p-2 block w-full border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                autoComplete='email'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                            { error.email ? (
                                <div className="text-red-500 text-sm">{error.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Enter your phone number"
                                className={`mt-2 p-2 block w-full border ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                autoComplete='tel'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                required
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                            ) : null}
                            { error.phone_number ? (
                                <div className="text-red-500 text-sm">{error.phone_number}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className={`mt-2 p-2 block w-full border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                autoComplete='new-password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                            { error.password ? (
                                <div className="text-red-500 text-sm">{error.password}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                className={`mt-2 p-2 block w-full border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                autoComplete='new-password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                required
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                            ) : null}   
                        </div>

                        <div className="mb-4">
                        <button 
                                type="submit" 
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        <p className="text-center text-sm text-gray-500">Already have an account? <u><Link to="/investor" className="text-blue-500 hover:text-blue-700">Sign in</Link></u></p>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default InvestorRegister;
 