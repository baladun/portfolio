import { PhotoDto } from '@/api-client';

let photos: PhotoDto[];

export const cachedPhotos = {
  get() {
    return photos;
  },
  set(data: PhotoDto[]) {
    photos = data;
    return photos;
  },
};
