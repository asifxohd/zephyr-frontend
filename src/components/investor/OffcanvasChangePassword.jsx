import React from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { passwordValidationSchema } from '../../utils/validations/passwordValidationSchema';
import { handleChangePasswordFormSubmition } from '../../services/api/Investor/passwordChange';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OffcanvasChangePassword = ({ isOpen, onClose }) => {
	const navigate = useNavigate()
	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const data = {
				current_password: values.currentPassword,
				new_password: values.newPassword,
				confirm_password: values.confirmPassword,
			};
			const response = await handleChangePasswordFormSubmition(data);
			resetForm();
			onClose()
			toast.success("password changed successfully please sign in to continue");
			localStorage.clear();
			navigate('../login')
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ x: '100%' }}
			animate={{ x: isOpen ? '0%' : '100%' }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50"
		>
			<div className="flex justify-between items-center p-3 border-b">
				<h2 className="text-md font-semibold text-gray-800">Change Password</h2>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-800">
					<FaTimes size={18} />
				</button>
			</div>
			<div className="p-5">
				<p className="text-gray-600 mb-4">
					To keep your account secure, please enter your current password and choose a new one.
					Make sure to follow the required password guidelines.
				</p>
				<Formik
					initialValues={{
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
					}}
					validationSchema={passwordValidationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<div className="mb-4">
								<label htmlFor="currentPassword" className="block text-sm text-gray-700 font-medium mb-1">
									Current Password
								</label>
								<Field
									type="password"
									name="currentPassword"
									id="currentPassword"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
									placeholder="Enter current password"
								/>
								<ErrorMessage name="currentPassword" component="div" className="text-red-500 text-xs mt-1" />
							</div>

							<div className="mb-4">
								<label htmlFor="newPassword" className="block text-sm text-gray-700 font-medium mb-1">
									New Password
								</label>
								<Field
									type="password"
									name="newPassword"
									id="newPassword"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
									placeholder="Enter new password"
								/>
								<ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1" />
							</div>

							<div className="mb-4">
								<label htmlFor="confirmPassword" className="block text-sm text-gray-700 font-medium mb-1">
									Confirm New Password
								</label>
								<Field
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
									placeholder="Confirm new password"
								/>
								<ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors text-sm"
							>
								Change Password
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</motion.div>
	);
};

export default OffcanvasChangePassword;
