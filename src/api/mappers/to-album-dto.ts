import { Album, Image } from '@prisma/client';
import { toImageDto } from './to-image-dto';
import { AlbumDto } from '../models';

export function toAlbumDto(model: Album & { coverImage: Image | null }): AlbumDto {
  const { coverImage, coverImageId, createdAt, ...rest } = model;

  return {
    ...rest,
    coverImage: coverImage ? toImageDto(coverImage) : null,
    createdAt: createdAt as unknown as string,
  };
}
