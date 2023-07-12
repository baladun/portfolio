import { Image, Photo } from '@prisma/client';
import { toImageDto } from './to-image-dto';
import { PhotoDto } from '../models';

export function toPhotoDto(model: Photo & { image: Image }): PhotoDto {
  const { image, imageId, createdAt, ...rest } = model;

  return {
    ...rest,
    image: toImageDto(image),
    createdAt: createdAt as unknown as string,
  };
}
