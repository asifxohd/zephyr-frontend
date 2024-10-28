import * as Yup from 'yup';

export const validationSchema = Yup.object({
    company_name: Yup.string().required('Company name is required'),
    // industry: Yup.string().required('Industry is required'),
    // location: Yup.string().required('Location is required'),
    phone_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number must be a number')
        .length(10, 'Mobile number must be exactly 10 digits'),
    business_type: Yup.string().required('Business type is required'),
    company_stage: Yup.string().required('Company stage is required'),
    seeking_amount: Yup.number()
        .required('Seeking amount is required')
        .min(0, 'Seeking amount must be greater than or equal to 0')
        .positive('Seeking amount must be a positive number'),
    website: Yup.string()
        .url('Must be a valid URL')
        .required('Website URL is required'),
    product_type: Yup.string().required('Product type is required'),
    annual_revenue: Yup.number()
        .required('Annual revenue is required')
        .min(0, 'Annual revenue must be greater than or equal to 0')
        .positive('Annual revenue must be a positive number'),
    employee_count: Yup.number()
        .required('Employee count is required')
        .min(1, 'Employee count must be at least 1')
        .integer('Employee count must be an integer')
        .positive('Employee count must be a positive number'),
    linkedIn: Yup.string().url('Must be a valid LinkedIn URL').required('LinkedIn profile is required'),
    facebook: Yup.string().url('Must be a valid Facebook URL').required('Facebook profile is required'),
    twitter: Yup.string().url('Must be a valid Twitter URL').required('Twitter profile is required'),
    company_description: Yup.string()
        .required('Company description is required')
        .min(50, 'Description must be at least 50 characters')
});
