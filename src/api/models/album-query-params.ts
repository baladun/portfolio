import { Album, Prisma } from '@prisma/client';

export type AlbumSortKey = keyof Pick<Album, 'createdAt' | 'categoryOrder'>;

export interface AlbumQueryParams {
  name?: string;
  categoryId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
  sort?: `${AlbumSortKey},${Prisma.SortOrder}`;
}
