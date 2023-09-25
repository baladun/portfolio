'use client';

import { CarouselProps } from './types';
import Image from 'next/image';
import { getPublicObjectUrl } from '@/utils';
import { notFound, useRouter } from 'next/navigation';
import { IconPark } from '@/shared/IconPark';
import { Button } from '@/shared/Button';
import classnames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { useKeyPress } from '@/hooks';
import { useContext, useEffect } from 'react';
import { AlbumPhotosContext } from '@/context';

export function Carousel({ photoId }: CarouselProps) {
  const router = useRouter();
  const { photos: cachedPhotos } = useContext(AlbumPhotosContext);
  const curIdx = cachedPhotos.findIndex(cachedPhoto => cachedPhoto.id === photoId) as number;
  const lastIdx = cachedPhotos.length - 1;
  const prevPhotoId = curIdx ? cachedPhotos[curIdx - 1].id : null;
  const nextPhotoId = curIdx !== lastIdx ? cachedPhotos[curIdx + 1].id : null;
  const photo = cachedPhotos[curIdx];

  useKeyPress('Escape', () => closeModal());
  useKeyPress('ArrowRight', () => forward());
  useKeyPress('ArrowLeft', () => back());

  const handlers = useSwipeable({
    onSwipedLeft: () => forward(),
    onSwipedRight: () => back(),
    trackMouse: true,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!photo) {
    return notFound();
  }
  const forward = () => nextPhotoId && changePhotoId(nextPhotoId);
  const back = () => prevPhotoId && changePhotoId(prevPhotoId);

  const changePhotoId = (id: number) => {
    router.replace(`/photos/${id}`);
  };

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-[100dvh] w-screen items-center justify-center bg-black backdrop-blur-xl">
      {/* Main */}
      <div
        className="relative flex aspect-[1.6/2] max-h-[80vh] items-center justify-center lg:w-11/12"
        {...handlers}
      >
        <Image
          src={getPublicObjectUrl(photo.image.id)}
          width={photo.image.width > photo.image.height ? 1200 : 800}
          height={photo.image.height > photo.image.width ? 1200 : 800}
          priority
          alt="Main image"
          className="max-h-full rounded-xl object-contain"
        />

        {(prevPhotoId || nextPhotoId) && (
          <Button
            kind="text"
            color="snow"
            icon={<IconPark type="Close" />}
            className="absolute right-0 top-0"
            onClick={closeModal}
          />
        )}
        {prevPhotoId && (
          <Button
            kind="text"
            color="snow"
            icon={<IconPark type="Left" />}
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() => changePhotoId(prevPhotoId)}
          />
        )}
        {nextPhotoId && (
          <Button
            kind="text"
            color="snow"
            icon={<IconPark type="Right" />}
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => changePhotoId(nextPhotoId)}
          />
        )}
      </div>

      {/* Preview */}
      <div className="fixed bottom-0 w-full overflow-hidden">
        <div className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14">
          {cachedPhotos.map(({ id, image: { id: imageId } }) => (
            <span
              onClick={() => changePhotoId(id)}
              key={id}
              className={classnames(
                'relative inline-block w-full shrink-0 overflow-hidden',
                id === photoId ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10',
              )}
              style={{
                translate: `${Math.max((curIdx + 1 - 1) * -100, cachedPhotos.length * -100)}% 0`,
                scale: id === photoId ? 1.5 : 1,
              }}
            >
              <Image
                alt="small photos on the bottom"
                width={180}
                height={120}
                className={classnames(
                  'pointer h-full object-cover transition',
                  id === photoId ? 'brightness-110 hover:brightness-110' : 'brightness-50 contrast-125 hover:brightness-75',
                )}
                src={getPublicObjectUrl(imageId)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
