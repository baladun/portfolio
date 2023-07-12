import { Album, Category } from '@prisma/client';
import { Expand } from '@/types';

export type UpdateAlbumDto = Expand<Partial<Pick<Album, 'name' | 'description' | 'categoryId' | 'coverImageId'>>>;
