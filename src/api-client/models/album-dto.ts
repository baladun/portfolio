import { Album } from '@prisma/client';
import { ImageDto } from './image-dto';

export type AlbumDto = Omit<Album, 'coverImageId' | 'createdAt'> & {
  coverImage: ImageDto | null;
  createdAt: string;
};
