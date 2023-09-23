import { array, boolean, number, object, string } from 'yup';

export const withNumberIdValidationSchema = object({
  id: number().integer().required(),
});

export const withStringIdValidationSchema = object({
  id: string().required(),
});

export const createAlbumDtoValidationSchema = object({
  name: string().required(),
  categoryId: number().integer().required(),
  description: string().optional(),
  coverImageId: string().optional(),
});

export const updateAlbumDtoValidationSchema = object({
  name: string().optional(),
  categoryId: number().integer().optional(),
  description: string().optional().nullable(),
  coverImageId: string().optional().nullable(),
});

export const updateAlbumOrderValidationSchema = array(
  object({
    id: number().integer().required(),
    categoryOrder: number().integer().optional(),
    showcaseOrder: number().integer().optional().nullable(),
  }),
).required();

export const albumQueryParamsValidationSchema = object({
  name: string().optional(),
  categoryId: number().integer().optional(),
  createdDateFrom: string().optional(),
  createdDateTo: string().optional(),
  showcaseOnly: boolean().optional(),
  sort: (string() as any).optional(),
});

export const createCategoryDtoValidationSchema = object({
  name: string().required(),
  coverImageId: string().optional(),
});

export const updateCategoryOrderValidationSchema = array(
  object({
    id: number().integer().required(),
    name: string().optional(),
    coverImageId: string().optional().nullable(),
    order: number().integer().optional(),
  }),
).required();

export const categoryQueryParamsValidationSchema = object({
  createdDateFrom: string().optional(),
  createdDateTo: string().optional(),
  sort: (string() as any).optional(),
});

export const createPhotoDtoValidationSchema = object({
  albumId: number().integer().required(),
  imageIds: array(string().required()).required(),
});

export const updatePhotoOrderValidationSchema = array(
  object({
    id: number().integer().required(),
    order: number().integer().required(),
  }),
).required();

export const photoQueryParamsValidationSchema = object({
  albumId: number().integer().optional(),
  createdDateFrom: string().optional(),
  createdDateTo: string().optional(),
  sort: (string() as any).optional(),
});

export const showcaseAddDtoValidationSchema = object({
  albumId: number().integer().required(),
});

export const showcaseOrderUpdateDtoValidationSchema = array(
  object({
    albumId: number().integer().required(),
    order: number().integer().required().nullable(),
  }),
).required();

export const revalidateDtoValidationSchema = object({
  paths: array(string().required()).optional(),
  tags: array(string().required()).optional(),
});

export const upsertVisitorDtoValidationSchema = object({
  id: string().required(),
  timezone: string().required(),
});
