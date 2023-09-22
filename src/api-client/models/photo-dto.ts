import { Photo } from '@prisma/client';
import { ImageDto } from './image-dto';
import { Expand } from '@/types';

export type PhotoDto = Expand<
  Omit<Photo, 'imageId' | 'createdAt'> & {
    image: ImageDto;
    createdAt: string;
  }
>;
