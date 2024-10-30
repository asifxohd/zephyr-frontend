import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { uploadVideo } from '../../services/api/business/videoUploadingApi';
import SmallSpinner from '../spinner/SmallSpinner'
import { toast } from 'react-toastify';

const VideoUploadForm = ({ onSubmit, closeDrawer }) => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            file: null,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Video title is required')
                .max(50, 'Title must be 50 characters or less'),
            description: Yup.string()
                .required('Video description is required')
                .max(750, 'Description must be 750 characters or less'),
            file: Yup.mixed()
                .required('A video file is required')
                .test('fileType', 'Only video files are allowed', (value) =>
                    value ? value.type.startsWith('video/') : false
                ),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const formData = new FormData()
                formData.append('video_title', values.title);
                formData.append('video_description', values.description);
                formData.append('video_file', values.file);
                const data = await uploadVideo(formData);
                console.log('Upload successful:', data);
                closeDrawer()
            } catch (error) {
                console.error('Error uploading video:', error);
                toast.error("A pitching video exists please remove it before uploading new video")
            } finally {
                setLoading(false)
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('file', file);
    };

    return (
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Video Title Field */}
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineDocumentText size={20} className="mr-2" />
                    Video Title
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter video title"
                    className={`w-full border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                ) : null}
            </div>

            {/* Video Description Field */}
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineDocumentText size={20} className="mr-2" />
                    Video Description
                </label>
                <textarea
                    name="description"
                    rows="3"
                    placeholder="Enter video description"
                    className={`w-full border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                ) : null}
            </div>

            {/* Video Upload Field */}
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <HiOutlineDocumentText size={20} className="mr-2" />
                    Upload Video
                </label>
                <div className="relative border">
                    <input
                        type="file"
                        accept="video/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        onBlur={() => formik.setFieldTouched('file', true)}
                    />
                    <button
                        type="button"
                        className="bg-white text-black border px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        Choose File
                    </button>
                    <span className="ml-3 text-sm text-gray-500">{formik.values.file ? formik.values.file.name : 'No file chosen'}</span>
                </div>
                {formik.touched.file && formik.errors.file ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.file}</p>
                ) : null}
            </div>

            {/* Save Button for Video */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2  rounded-md hover:bg-gray-600"
                >
                    {loading ? <SmallSpinner /> : "Update"}
                </button>
            </div>
        </form>
    );
};

export default VideoUploadForm;
