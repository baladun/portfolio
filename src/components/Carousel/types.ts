import { PhotoDto } from '@/api';

export interface CarouselProps {
  photoId: number;
  cachedPhotos: PhotoDto[];
}
