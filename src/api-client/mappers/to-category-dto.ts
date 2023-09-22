import { CategoryDto } from '../models';
import { Category, Image } from '@prisma/client';
import { toImageDto } from './to-image-dto';

export function toCategoryDto(model: Category & { coverImage: Image | null }): CategoryDto {
  const { coverImage, coverImageId, createdAt, ...rest } = model;

  return {
    ...rest,
    coverImage: coverImage ? toImageDto(coverImage) : null,
    createdAt: createdAt as unknown as string,
  };
}
