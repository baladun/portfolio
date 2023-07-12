import { Photo, Prisma } from '@prisma/client';

export type PhotoSortKey = keyof Pick<Photo, 'createdAt' | 'order'>;

export interface PhotoQueryParams {
  albumId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
  sort?: `${PhotoSortKey},${Prisma.SortOrder}`;
}
