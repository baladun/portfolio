import { array, InferType, object, string } from 'yup';
import { validationMsg } from '@/configs';
import { Expand } from '@/types';

export const addCategoryFormValidationSchema = object({
  name: string().required(validationMsg.REQUIRED),
  coverImage: array().nullable(),
});

// export type NewCategoryFormValue = InferType<typeof newCategoryFormValidationSchema>;
export type AddCategoryFormValue = Expand<
  Omit<InferType<typeof addCategoryFormValidationSchema>, 'coverImage'> & {
    coverImage?: Blob[];
  }
>;
