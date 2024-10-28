import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    name: Yup.string()
        .matches(/^(?!.*\s{2,}).*$/, 'Name cannot contain consecutive spaces')
        .trim()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .matches(/^(?!.*\s{2,}).*$/, 'Email cannot contain consecutive spaces')
        .trim()
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^\S*$/, 'Password cannot contain spaces')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});