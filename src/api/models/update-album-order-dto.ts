import { Album, Category } from '@prisma/client';
import { Expand } from '@/types';

export type UpdateAlbumOrderDto = Expand<Pick<Album, 'id'> & Partial<Pick<Album, 'categoryOrder' | 'showcaseOrder'>>>;
