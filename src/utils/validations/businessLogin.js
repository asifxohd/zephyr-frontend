import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^\S*$/, 'Password should not contain spaces')
    .required('Password is required'),
});
