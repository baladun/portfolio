import { Album, Category } from '@prisma/client';
import { Expand } from '@/types';

export type UpdateAlbumDto = Expand<Pick<Album, 'id'> & Partial<Omit<Album, 'id' | 'createdAt'>>>;
