import { Category } from '@prisma/client';
import { Expand } from '@/types';

export type CategoryUpdateDto = Expand<Pick<Category, 'id'> & Partial<Omit<Category, 'id' | 'createdAt'>>>;
