import { InferType, object, string } from 'yup';
import { validationMsg } from '@/configs';

export const signInFormValidationSchema = object({
  email: string().email().required(validationMsg.REQUIRED),
  password: string().required(validationMsg.REQUIRED),
});

export type SignInFormValue = InferType<typeof signInFormValidationSchema>;
