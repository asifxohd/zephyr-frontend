import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineDocumentText } from 'react-icons/hi';
import SmallSpinner from '../spinner/SmallSpinner';
import { uploadDocument } from '../../services/api/business/DocumentUpload';

const DocumentForm = ({closeDrawer}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            file: null,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(100, 'Must be 100 characters or less')
                .required('Document title is required'),
            description: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Document description is required'),
            file: Yup.mixed().required('A file is required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('document_title', values.title);
            formData.append('document_description', values.description);
            formData.append('document_file', values.file);

            try {
                setLoading(true);
                const response = await uploadDocument(formData);
                console.log(response);
                closeDrawer()
            } catch (error) {
                setError(error?.response?.data)
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('file', file);
    };

    return (
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineDocumentText size={20} className="mr-2" />
                    Document Title
                </label>
                <input
                    type="text"
                    placeholder="Enter document title"
                    className={`w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm ${formik.touched.title && formik.errors.title ? 'border-red-600' : 'border-gray-300'}`}
                    {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-600 text-xs">{formik.errors.title}</div>
                ) : null}
                {errors ? (
                    <div className="text-red-600 text-xs">{errors.document_title}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineDocumentText size={20} className="mr-2" />
                    Document Description
                </label>
                <textarea
                    rows="3"
                    placeholder="Enter document description"
                    className={`w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm ${formik.touched.description && formik.errors.description ? 'border-red-600' : 'border-gray-300'}`}
                    {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-600 text-xs">{formik.errors.description}</div>
                ) : null}
            </div>

            <div className="relative border border-gray-400 rounded-sm">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx" 
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    className="bg-white text-black  px-4 py-2 rounded-md"
                >
                    Choose File
                </button>
                <span className="ml-3 text-sm text-gray-500">{formik.values.file ? formik.values.file.name : 'No file chosen'}</span>
            </div>

            {formik.touched.file && formik.errors.file ? (
                <span className="text-red-600 text-xs">{formik.errors.file}</span>
            ) : null}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="text-white bg-black px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    {loading ? <SmallSpinner /> : "Update"}
                </button>
            </div>
        </form>
    );
};

export default DocumentForm;
