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

export function Carousel({ photoId, cachedPhotos }: CarouselProps) {
  const router = useRouter();
  const curIdx = cachedPhotos.findIndex(cachedPhoto => cachedPhoto.id === photoId) as number;
  const lastIdx = cachedPhotos.length - 1;
  const prevPhotoId = curIdx ? cachedPhotos[curIdx - 1].id : null;
  const nextPhotoId = curIdx !== lastIdx ? cachedPhotos[curIdx + 1].id : null;
  const photo = cachedPhotos[curIdx];

  useKeyPress('Escape', () => closeModal());
  useKeyPress('ArrowRight', () => forward());
  useKeyPress('ArrowLeft', () => back());

  const handlers = useSwipeable({
    onSwipedLeft: () => back(),
    onSwipedRight: () => forward(),
    trackMouse: true,
  });

  if (!photo) {
    return notFound();
  }

  const forward = () => nextPhotoId && changePhotoId(nextPhotoId);
  const back = () => prevPhotoId && changePhotoId(prevPhotoId);

  const changePhotoId = (id: number) => {
    router.push(`/photos/${id}`);
  };

  const closeModal = () => {
    // hack because Next does not close modal
    window.location.href = `/albums/${photo.albumId}`;
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black backdrop-blur-xl">
      {/* Main */}
      <div
        className="relative flex aspect-[3/2] max-h-[80vh] items-center justify-center lg:w-11/12"
        {...handlers}
      >
        <Image
          src={getPublicObjectUrl(photo.image.id)}
          width={photo.image.width}
          height={photo.image.height}
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
        <div className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14 justify-center">
          {cachedPhotos.map(({ id, image: { id: imageId } }) => (
            <span
              onClick={() => changePhotoId(id)}
              key={id}
              className={classnames(
                'relative inline-block w-full shrink-0 overflow-hidden',
                id === photoId ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10',
              )}
              style={{
                translate: `${Math.max((curIdx - 1) * -100, 15 * -100)}% 0`,
                scale: id === photoId ? 1.25 : 1,
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
