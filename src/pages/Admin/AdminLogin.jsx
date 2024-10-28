import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validations/adminLogin';
import { submitLoginForm } from '../../services/api/login';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await submitLoginForm(values)
                const role = useAuth();
                if (role == 'admin'){
                    navigate('../dashboard')
                    toast.success("Sign In successfull")
                }else{
                    localStorage.clear();
                    toast.error("invalidCredentis")
                }
                
            } catch (error) {
                if (error.response?.data.detail){
                    toast.error(error.response?.data.detail)
                }else{
                    console.log(error);x
                    
                }
            }
        }
    })


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative max-sm:w-72 flex flex-col border p-5 text-gray-700 bg-transparent shadow-none rounded bg-clip-border">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <b>
                        Admin Portal &#9997;
                    </b>
                </h4>
                <p className="block mt-1 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
                    Welcome back! Enter your credentials to sign in.
                </p>
                <br />
                <form onSubmit={formik.handleSubmit} className="max-w-screen-lg max-sm:w-60 mb-2 w-80 sm:w-96">
                    <div className="flex flex-col max-sm:w-60 gap-6 mb-1">
                        <h6 className="block max-sm:w-60 -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                            username
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                type="text"
                                name="username"
                                autoComplete='username'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                placeholder="Enter your username"
                                className="peer h-full max-sm:w-64 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                required
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className='m-1 text-red-500 text-xs' >{formik.errors.username}</div>
                                ) : null}
                        </div>
                        <h6 className="block max-sm:w-60 -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                            Password
                        </h6>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter The Password"
                                className="peer h-full w-full rounded-md border max-sm:w-64 border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                autoComplete='current-password'
                            />
                             {formik.touched.password && formik.errors.password ? (
                                <div className='m-1 text-red-500 text-xs' >{formik.errors.password}</div>
                                ) : null}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-8 block w-full max-sm:w-64 select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
