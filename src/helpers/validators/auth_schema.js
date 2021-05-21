import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
});

export const loginSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().email().required(),
});
