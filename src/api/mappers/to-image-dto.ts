import { ImageDto } from '../models';
import { Image } from '@prisma/client';

export function toImageDto(model: Image): ImageDto {
  const { createdAt, ...rest } = model;

  return {
    ...rest,
    createdAt: createdAt as unknown as string,
  };
}
