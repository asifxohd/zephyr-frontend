import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhotograph, HiOutlineCube, HiOutlineGlobeAlt, HiOutlineTrendingUp, HiOutlineCurrencyDollar, HiOutlineChartBar, HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineLink, HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineTag, HiOutlineBriefcase, HiOutlineUsers } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validations/BusinessProfileValidations'
import { updateBusinessPreferences, fetchBusinessPreferences } from '../../services/api/BusinessProfile';
import { fetchCombinedData } from '../../services/api/InvestorProfile';
import Select from 'react-select';
import {toast} from 'react-toastify'

const EditProfileDrawer = ({ isOpen, onClose }) => {
    const [activeSection, setActiveSection] = useState('basic');
    const [data, setData] = useState({ locations: [], industries: [] });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [ userInfo, setUserInfo ] = useState([])

    const formik = useFormik({
        initialValues: {
            company_name: '',
            industry: '',
            location: '',
            phone_number: '',
            business_type: '',
            company_stage: '',
            seeking_amount: '',
            website: '',
            product_type: '',
            annual_revenue: '',
            employee_count: '',
            linkedIn: '',
            facebook: '',
            twitter: '',
            company_description: '',
            avatar_image: '',
            cover_image: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            const formData = new FormData();
            formData.append('company_name', values.company_name);
            formData.append('industry', values.industry.label);
            formData.append('location', values.location.label);
            formData.append('phone_number', values.phone_number);
            formData.append('business_type', values.business_type);
            formData.append('company_stage', values.company_stage);
            formData.append('seeking_amount', values.seeking_amount);
            formData.append('website', values.website);
            formData.append('product_type', values.product_type);
            formData.append('annual_revenue', values.annual_revenue);
            formData.append('employee_count', values.employee_count);
            formData.append('linkedIn', values.linkedIn);
            formData.append('facebook', values.facebook);
            formData.append('twitter', values.twitter);
            formData.append('company_description', values.company_description);
            formData.append('user.phone_number', values.phone_number);

            if (values.avatar_image) {
                formData.append('avatar_image', values.avatar_image);
            }
            if (values.cover_image) {
                formData.append('cover_image', values.cover_image);
            }
        
        
            try {
                const response = await updateBusinessPreferences(formData);
                console.log('Update successful:', response);
                toast.success("Business Profile updated successfully")
            } catch (error) {
                console.error('Error updating business preferences:', error.response?.data || error.message);
            }
        }
    })

    const {setFieldValue } = formik;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await fetchCombinedData();
                setData(result);
                console.log(result);

            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await fetchBusinessPreferences();
                setUserInfo(response);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const result = await fetchCombinedData();
                setData(result);
                console.log(result);

            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue(event.currentTarget.name, file);
        }
    };
    
    const locationOptions = data.locations.map((item) => (
        { value: item.id, label: item.name }
    ))
    const industryOptions = data.industries.map((item) => (
        { value: item.id, label: item.name }
    ))
    const handleLocationChange = (selectedOptions) => {
        setFieldValue('location', selectedOptions);
    };

    const handleIndustryChange = (selectedOptions) => {
        setFieldValue('industry', selectedOptions);
    };

    useEffect(() => {
        if (userInfo) {
            formik.setValues({
                company_name: userInfo.company_name || '',
                industry: {value:userInfo.id, label:userInfo.industry} || null,
                location: {value:userInfo.id, label:userInfo.location} || null, 
                phone_number: userInfo?.user?.phone_number || '',
                business_type: userInfo.business_type || '',
                company_stage: userInfo.company_stage || '',
                seeking_amount: userInfo.seeking_amount || '',
                website: userInfo.website || '',
                product_type: userInfo.product_type || '',
                annual_revenue: userInfo.annual_revenue || '',
                employee_count: userInfo.employee_count || '',
                linkedIn: userInfo.linkedIn || '',
                facebook: userInfo.facebook || '',
                twitter: userInfo.twitter || '',
                company_description: userInfo.company_description || '',
                avatar_image: userInfo.avatar_image || '',
                cover_image: userInfo.cover_image || '',
            });
        }
    }, [userInfo]);

    return (
        <motion.div
            className="fixed bottom-0 md:px-20 left-0 w-full h-[90vh] bg-white border-t border-gray-200 rounded-t-3xl z-50"
            initial={{ y: '100%' }}
            animate={{ y: isOpen ? '0%' : '100%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="p-6 flex flex-col h-full scrollbar-hide overflow-y-auto">
                <button
                    onClick={onClose}
                    className="self-end text-gray-500 hover:text-gray-700 mb-4"
                >
                    <FaTimes size={28} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Edit Company Profile</h2>

                <div className="mb-6 flex space-x-4">
                    <button
                        onClick={() => setActiveSection('basic')}
                        className={`px-4 py-2 r ${activeSection === 'basic' ? 'bg-black rounded-full text-white' : 'bg-gray-200 rounded-3xl text-gray-700'}`}
                    >
                        Basic Info
                    </button>
                    <button
                        onClick={() => setActiveSection('documents')}
                        className={`px-4 py-2  ${activeSection === 'documents' ? 'bg-black rounded-full text-white' : 'bg-gray-200 rounded-3xl text-gray-700'}`}
                    >
                        Documents
                    </button>
                    <button
                        onClick={() => setActiveSection('video')}
                        className={`px-4 py-2  ${activeSection === 'video' ? 'bg-black rounded-full text-white' : 'bg-gray-200 rounded-3xl text-gray-700'}`}
                    >
                        Video Pitch
                    </button>
                </div>

                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}



                {activeSection === 'basic' && (
                    <form onSubmit={formik.handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlinePhotograph size={20} className="mr-2" />
                                Avatar Image
                            </label>
                            <input
                                type="file"
                                name="avatar_image"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                onChange={(event) => handleFileChange(event, setAvatarImageName)}
                                
                            />
                            {formik.touched.avatar_image && formik.errors.avatar_image && <div className="text-red-600 text-xs">{formik.errors.avatar_image}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlinePhotograph size={20} className="mr-2" />
                                Cover Image
                            </label>
                            <input
                                type="file"
                                name="cover_image"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                onChange={(event) => handleFileChange(event, setCoverImageName)}
                                />
                            {formik.touched.cover_image && formik.errors.cover_image && <div className="text-red-600 text-xs">{formik.errors.cover_image}</div>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineTag size={20} className="mr-2" />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your company name"
                                    name="company_name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.company_name && formik.errors.company_name && <div className="text-red-600 text-xs">{formik.errors.company_name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineBriefcase size={20} className="mr-2" />
                                    Industry
                                </label>
                                <Select
                                    options={industryOptions}
                                    value={formik.values.industry}
                                    onChange={handleIndustryChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                />
                                {formik.touched.industry && formik.errors.industry && <div className="text-red-600 text-xs ">{formik.errors.industry}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineLocationMarker size={20} className="mr-2" />
                                    Location
                                </label>
                                <Select
                                    options={locationOptions}
                                    value={formik.values.location}
                                    onChange={handleLocationChange}
                                    className="basic-single"
                                    classNamePrefix="select"
                                />
                                {formik.touched.location && formik.errors.location && <div className="text-red-600 text-xs">{formik.errors.location}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlinePhone size={20} className="mr-2" />
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    name="phone_number"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.phone_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone_number && formik.errors.phone_number && <div className="text-red-600 text-xs">{formik.errors.phone_number}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineOfficeBuilding size={20} className="mr-2" />
                                    Business Type
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter business type"
                                    name="business_type"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.business_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.business_type && formik.errors.business_type && <div className="text-red-600 text-xs">{formik.errors.business_type}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineTrendingUp size={20} className="mr-2" />
                                    Company Stage
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter current company stage"
                                    name="company_stage"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.company_stage}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.company_stage && formik.errors.company_stage && <div className="text-red-600 text-xs">{formik.errors.company_stage}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Company Description
                            </label>
                            <textarea
                                rows="4"
                                maxLength={250}
                                placeholder="Describe your company (250 words or more)"
                                name="company_description"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                value={formik.values.company_description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.company_description && formik.errors.company_description && <div className="text-red-600 text-xs">{formik.errors.company_description}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineCurrencyDollar size={20} className="mr-2" />
                                    Seeking Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter amount seeking"
                                    name="seeking_amount"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.seeking_amount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.seeking_amount && formik.errors.seeking_amount && <div className="text-red-600 text-xs">{formik.errors.seeking_amount}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineLink size={20} className="mr-2" />
                                    Website
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter website URL"
                                    name="website"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.website && formik.errors.website && <div className="text-red-600 text-xs">{formik.errors.website}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineCube size={20} className="mr-2" />
                                    Product Type
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product type"
                                    name="product_type"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.product_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.product_type && formik.errors.product_type && <div className="text-red-600 text-xs">{formik.errors.product_type}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineChartBar size={20} className="mr-2" />
                                    Annual Revenue
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter annual revenue"
                                    name="annual_revenue"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.annual_revenue}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.annual_revenue && formik.errors.annual_revenue && <div className="text-red-600 text-xs">{formik.errors.annual_revenue}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineUsers size={20} className="mr-2" />
                                    Employee Count
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter employee count"
                                    name="employee_count"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.employee_count}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.employee_count && formik.errors.employee_count && <div className="text-red-600 text-xs">{formik.errors.employee_count}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineGlobeAlt size={20} className="mr-2" />
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter LinkedIn profile URL"
                                    name="linkedIn"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.linkedIn}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.linkedIn && formik.errors.linkedIn && <div className="text-red-600 text-xs">{formik.errors.linkedIn}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineGlobeAlt size={20} className="mr-2" />
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter Facebook profile URL"
                                    name="facebook"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.facebook}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.facebook && formik.errors.facebook && <div className="text-red-600 text-xs">{formik.errors.facebook}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <HiOutlineGlobeAlt size={20} className="mr-2" />
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    placeholder="Enter Twitter profile URL"
                                    name="twitter"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    value={formik.values.twitter}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.twitter && formik.errors.twitter && <div className="text-red-600 text-xs">{formik.errors.twitter}</div>}
                            </div>
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}






                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}




                {activeSection === 'documents' && (
                    <form className="space-y-6">
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Document Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter document title"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Document Description
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Enter document description"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <div className="relative  border border-black">
                            <input
                                type="file"
                                accept="video/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="bg-white-700 text-black border border-blac px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Choose File
                            </button>
                            <span className="ml-3 text-sm  text-gray-500">No file chosen</span>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}

                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}



                {activeSection === 'video' && (
                    <form className="space-y-6">
                        {/* Video Title Field */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Video Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter video title"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        {/* Video Description Field */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Video Description
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Enter video description"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        {/* Video Upload Field */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineDocumentText size={20} className="mr-2" />
                                Upload Video
                            </label>
                            <div className="relative  border border-black">
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <button
                                    type="button"
                                    className="bg-white-700 text-black border border-blac px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                >
                                    Choose File
                                </button>
                                <span className="ml-3 text-sm  text-gray-500">No file chosen</span>
                            </div>
                        </div>

                        {/* Save Button for Video */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}


                    </form>


                )}

            </div>
        </motion.div>
    );
};

export default EditProfileDrawer;
