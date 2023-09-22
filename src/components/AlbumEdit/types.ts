import { AlbumDto, CategoryDto } from '@/api-client';

export interface AlbumEditProps {
  album: AlbumDto;
  categories: CategoryDto[];
}

export interface PreloadedCover {
  id: string;
  file: File;
}
