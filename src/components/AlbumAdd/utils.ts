import { array, InferType, object, string } from 'yup';
import { validationMsg } from '@/configs';
import { Expand } from '@/types';

export const addAlbumFormValidationSchema = object({
  name: string().required(validationMsg.REQUIRED),
  description: string(),
  coverImage: array().nullable(),
});

export type AddAlbumFormValue = Expand<
  Omit<InferType<typeof addAlbumFormValidationSchema>, 'coverImage'> & {
    coverImage?: Blob[];
  }
>;
