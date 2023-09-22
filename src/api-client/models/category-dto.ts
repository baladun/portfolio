import { Category } from '@prisma/client';
import { ImageDto } from './image-dto';

export type CategoryDto = Omit<Category, 'coverImageId' | 'createdAt'> & {
  coverImage: ImageDto | null;
  createdAt: string;
};
