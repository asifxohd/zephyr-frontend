import React, { useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from '../../services/api/forgotPassword';
import { toast } from 'react-toastify';
import SmallSpinner from '../spinner/SmallSpinner';


const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Form submitted with values:", values);
            try {
                const response = await sendPasswordResetEmail(values.email);
                console.log("Reset link sent to:", response);
                toast.success(`Reset link sent successfully to ${values.email}`);
                onRequestClose();
            } catch (error) {
                console.error("Error sending reset link:", error);
                toast.error("Error sending reset link please try again after some time");
            } finally {
                setLoading(false);
                formik.resetForm();
            }
        },
    });

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="max-w-md mx-auto rounded-lg bg-white shadow-lg p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div className="flex flex-col items-center">
                <h2 className="text-blue-400 text-2xl font-semibold mb-4">Reset Your Password</h2>
                <p className="text-gray-700 mb-6 text-center">Please enter your email address below, and we will send you a link to reset your password.</p>
                <form onSubmit={formik.handleSubmit} className="w-full">
                    <label htmlFor="email" className="block text-black font-semibold mb-1">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        placeholder='enter your email address'
                        className={`w-full p-2 border rounded focus:outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-blue-500'} focus:border-blue-700`}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-xs py-1.5 text-center">{formik.errors.email}</div>
                    ) : null}

                    <button type="submit" className="w-full bg-blue-400 text-white p-2 mt-2 rounded hover:bg-blue-700 transition duration-200">
                        {loading ? <SmallSpinner /> : "Send Reset Link"}                    </button>
                </form>
                <button type="button" onClick={onRequestClose} className="mt-4 text-blue-400">Close</button>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
