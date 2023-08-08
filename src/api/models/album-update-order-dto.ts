import { Album } from '@prisma/client';
import { Expand } from '@/types';

export type AlbumUpdateOrderDto = Expand<Pick<Album, 'id'> & Partial<Pick<Album, 'categoryOrder' | 'showcaseOrder'>>>;
