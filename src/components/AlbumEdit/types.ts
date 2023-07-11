import { AlbumDto } from '@/api';

export interface AlbumEditProps {
  album: AlbumDto;
}

export interface PreloadedCover {
  id: string;
  file: File;
}
