import * as Yup from 'yup';

export const validationSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .min(1, 'Required')
        .matches(/^[^\s]+(\s+[^\s]+)*$/, 'No consecutive spaces allowed')
        .required('Full name is required'),
    phoneNumber: Yup.string()
        .length(10, 'Phone number must be exactly 10 digits')
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    location: Yup.array()
        .of(Yup.object())
        .required('At least one location is required'),
    industry: Yup.array()
        .of(Yup.object())
        .required('At least one industry is required'),
    description: Yup.string()
        .trim()
        .min(1, 'Description is required')
        .matches(/^[^\s]+(\s+[^\s]+)*$/, 'No consecutive spaces allowed')
        .required('Description is required')
});