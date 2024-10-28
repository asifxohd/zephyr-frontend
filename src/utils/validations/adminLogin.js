import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^\S+(?: \S+)*$/, 'No leading or consecutive spaces are allowed')
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: Yup.string()
    .matches(/^\S+(?: \S+)*$/, 'No leading or consecutive spaces are allowed')
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});
