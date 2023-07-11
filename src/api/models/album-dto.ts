import { Album } from '@prisma/client';
import { ImageDto } from '@/api';

export type AlbumDto = Omit<Album, 'coverImageId' | 'createdAt'> & {
  coverImage: ImageDto | null;
  createdAt: string;
};
