import { createContext, PropsWithChildren, useState } from 'react';
import { PhotoDto } from '@/api-client';

interface ScrollDirectionContextValue {
  photos: PhotoDto[];
  setPhotos: (photos: PhotoDto[]) => void;
}

export const AlbumPhotosContext = createContext<ScrollDirectionContextValue>({
  photos: [],
  setPhotos: () => {},
});

export const AlbumPhotosContextProvider = (props: PropsWithChildren) => {
  const [photos, setPhotos] = useState<PhotoDto[]>([]);

  return <AlbumPhotosContext.Provider value={{ photos, setPhotos }}>{props.children}</AlbumPhotosContext.Provider>;
};
