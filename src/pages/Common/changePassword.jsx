import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateToken, updateForgotPassword } from '../../services/api/validateForgotPasswordToken';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"

const ChangePassword = () => {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const { token } = useParams();
    const navigate = useNavigate()    

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const valid = await validateToken(token);
                    
                    setIsTokenValid(valid);
                } catch (error) {
                    console.error("Token validation failed:", error);
                    setIsTokenValid(false);
                }
            } else {
                setIsTokenValid(false);
            }
        };
        checkToken();
    }, [token]);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Must contain at least one number')
                .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
                .matches(/^\S*$/, 'Password should not contain spaces')
                .required('New password is required'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm your password'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await updateForgotPassword(token, values.newPassword)
                console.log('Password changed:', response);
                toast.success("password updated successfully")
                // navigate('/)
            } catch (error) {
                console.error('Error updating password:', error);
                toast.error('Error updating password')
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {!isTokenValid ? (
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
                    <p className="text-gray-700 mb-4">
                        It looks like your request for a password change has expired.
                        Please try again with another request.
                    </p>
                    <p className="text-gray-600 mb-4">
                        If you believe this is an error, please contact support for assistance.
                    </p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Change Password</h2>
                    <p className="text-gray-600 mb-4 text-center">
                        This page allows you to reset your password. Please enter your new password
                        and confirm.
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                                className={`w-full p-2 border rounded focus:outline-none ${formik.touched.newPassword && formik.errors.newPassword
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Enter new password"
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-gray-700 font-medium mb-1">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmNewPassword}
                                className={`w-full p-2 border rounded focus:outline-none ${formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Confirm new password"
                            />
                            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.confirmNewPassword}</div>
                            ) : null}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-150"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
