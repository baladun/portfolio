import { array, InferType, object, string } from 'yup';
import { validationMessages } from '@/configs';
import { Expand } from '@/types';

export const newCategoryFormValidationSchema = object({
  name: string().required(validationMessages.REQUIRED),
  coverImage: array().nullable(),
});

// export type NewCategoryFormValue = InferType<typeof newCategoryFormValidationSchema>;
export type NewCategoryFormValue = Expand<
  Omit<InferType<typeof newCategoryFormValidationSchema>, 'coverImage'> & {
    coverImage?: Blob[];
  }
>;
