import { Category } from '@prisma/client';
import { Expand } from '@/types';

export type CreateCategoryDto = {
  name: string;
  coverImageId?: string;
};
