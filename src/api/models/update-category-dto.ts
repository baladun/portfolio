import { Category } from '@prisma/client';
import { Expand } from '@/types';

export type UpdateCategoryDto = Expand<Pick<Category, 'id'> & Partial<Omit<Category, 'id'>>>;
