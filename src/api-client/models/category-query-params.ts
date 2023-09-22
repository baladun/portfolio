import { Category, Prisma } from '@prisma/client';

export type CategorySortKey = keyof Pick<Category, 'createdAt' | 'order'>;

export interface CategoryQueryParams {
  createdDateFrom?: string;
  createdDateTo?: string;
  sort?: `${CategorySortKey},${Prisma.SortOrder}`;
}
