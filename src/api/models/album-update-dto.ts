import { Album, Category } from '@prisma/client';
import { Expand } from '@/types';

export type AlbumUpdateDto = Expand<Partial<Pick<Album, 'name' | 'description' | 'categoryId' | 'coverImageId'>>>;
