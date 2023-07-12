import { array, InferType, object, string } from 'yup';
import { validationMsg } from '@/configs';
import { Expand } from '@/types';

export const addPhotosFormValidationSchema = object({
  images: array().required(validationMsg.REQUIRED),
});

export type AddPhotosFormValue = Expand<
  Omit<InferType<typeof addPhotosFormValidationSchema>, 'images'> & {
    images: Blob[];
  }
>;
