'use client';

import { AlbumPhotosHelperProps } from './types';
import { useContext, useEffect } from 'react';
import { AlbumPhotosContext } from '@/context';

export function AlbumPhotosHelper({ photos }: AlbumPhotosHelperProps) {
  const { setPhotos } = useContext(AlbumPhotosContext);

  useEffect(() => {
    setPhotos(photos);

    return () => setPhotos([]);
  }, []);

  return <></>;
}
