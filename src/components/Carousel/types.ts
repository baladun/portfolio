import { PhotoDto } from '@/api-client';

export interface CarouselProps {
  photoId: number;
  cachedPhotos: PhotoDto[];
}
