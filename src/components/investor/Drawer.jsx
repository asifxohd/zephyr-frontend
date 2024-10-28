import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineUserCircle, HiOutlinePhone, HiOutlinePencil, HiOutlineLocationMarker, HiOutlineTag } from 'react-icons/hi';
import Select from 'react-select';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validations/investorProfils';
import { fetchCombinedData, fetchUserInfo } from '../../services/api/InvestorProfile';
import { updateUserProfile } from '../../services/api/Investor/profileUpdation';

const Drawer = ({ isOpen, onClose, onProfileUpdate }) => {
    const [data, setData] = useState({ locations: [], industries: [] });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState([])

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            location: [], 
            industry: [], 
            description: '',
            avatarImage: null,
            coverImage: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('Submitting the following values:', values);
                const response = await updateUserProfile(values);
                onClose(false)
                onProfileUpdate();
            } catch (error) {
                console.error('Error updating profile', error.response?.data || error.message);
            }
        }
    });
    

    const { setValues,values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;

    const handleLocationChange = (selectedOptions) => {
        setFieldValue('location', selectedOptions);
    };

    const handleIndustryChange = (selectedOptions) => {
        setFieldValue('industry', selectedOptions);
    };

    useEffect(()=> {
        const loadData = async () => {
            setLoading(true);
            try {
              const result = await fetchCombinedData();
              setData(result);
            } catch (error) {
              setError('Error fetching data');
            } finally {
              setLoading(false);
            }
          };
          loadData();
    },[])

    useEffect(() => {
        const loadUserInfo = async () => {
            setLoading(true);
            try {
                const userInfo = await fetchUserInfo();
                const locations = userInfo?.investor_preferences?.preferred_locations || [];
                const industries = userInfo?.investor_preferences?.preferred_industries || [];
    
                setValues({
                    fullName: userInfo?.full_name || '',
                    phoneNumber: userInfo?.phone_number || '',
                    location: locations.map((loc) => ({ value: loc.id, label: loc.name })) || [],
                    industry: industries.map((ind) => ({ value: ind.id, label: ind.name })) || [],
                    description: userInfo?.investor_preferences?.description || '',
                });
    
            } catch (error) {
                console.log('Error fetching user info:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserInfo();
    }, [setValues]); 

    const locationOptions = data.locations.map((item)=> (
        { value: item.id, label: item.name }
    ))
    const industryOptions = data.industries.map((item)=> (
        { value: item.id, label: item.name }
    ))

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue(fieldName, file);
        }
    };
    


    const drawerContent = (
        <motion.div
            className="fixed bottom-0 z-10 lg:px-20 transform -translate-x-1/2 w-full h-[90vh] bg-white border rounded-t-3xl"
            initial={{ y: '100%' }}
            animate={{ y: isOpen ? '0%' : '100%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="p-6 flex flex-col h-full scrollbar-hide overflow-y-auto">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mb-4 self-end">
                    <FaTimes size={28} />
                </button>
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div className="">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <HiOutlineUserCircle size={20} className="mr-2" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter full name"
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {touched.fullName && errors.fullName ? (
                            <div className="text-red-600 text-sm mt-1">{errors.fullName}</div>
                        ) : null}
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineUserCircle size={20} className="mr-2" />
                                Avatar
                            </label>
                            <input
                                type="file"
                                onBlur={handleBlur}
                                onChange={(e) => handleFileChange(e, 'avatarImage')}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 'coverImage')}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <HiOutlinePhone size={20} className="mr-2" />
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {touched.phoneNumber && errors.phoneNumber ? (
                            <div className="text-red-600 text-sm mt-1">{errors.phoneNumber}</div>
                        ) : null}
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineLocationMarker size={20} className="mr-2" />
                                Preferred Locations
                            </label>
                            <Select
                                options={locationOptions}
                                isMulti
                                value={values.location}
                                onChange={handleLocationChange}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                            {touched.location && errors.location ? (
                                <div className="text-red-600 text-sm mt-1">{errors.location}</div>
                            ) : null}
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <HiOutlineTag size={20} className="mr-2" />
                                Preferred Sectors
                            </label>
                            <Select
                                options={industryOptions}
                                isMulti
                                value={values.industry}
                                onChange={handleIndustryChange}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                            {touched.industry && errors.industry ? (
                                <div className="text-red-600 text-sm mt-1">{errors.industry}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <HiOutlinePencil size={20} className="mr-2" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter description"
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            rows="3"
                        ></textarea>
                        {touched.description && errors.description ? (
                            <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(
        drawerContent,
        document.getElementById('portel-one')
    );
};

export default Drawer;
