import { InferType, number, object } from 'yup';
import { Expand } from '@/types';
import { addAlbumFormValidationSchema } from '@/components/AlbumAdd';
import { validationMsg } from '@/configs';

export const editAlbumFormValidationSchema = addAlbumFormValidationSchema.concat(
  object({
    categoryId: number().required(validationMsg.REQUIRED),
  }),
);

export type EditAlbumFormValue = Expand<
  Omit<InferType<typeof editAlbumFormValidationSchema>, 'coverImage'> & {
    coverImage?: Blob[];
  }
>;
