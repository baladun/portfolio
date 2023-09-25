'use client';

import { PhotoStaticProps } from './types';
import Image from 'next/image';
import { getPublicObjectUrl } from '@/utils';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { useRouter } from 'next/navigation';

export function PhotoStatic({ photo }: PhotoStaticProps) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center">
      <Image
        src={photo.image.blurDataUrl}
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        alt="blurred background"
        fill
      />

      <div className="relative flex aspect-[2/2] max-h-[80vh] items-center justify-center lg:w-11/12">
        <Image
          src={getPublicObjectUrl(photo.image.id)}
          width={photo.image.width}
          height={photo.image.height}
          priority
          alt="Main image"
          className="max-h-full rounded-xl object-contain"
        />

        <Button
          kind="text"
          color="snow"
          icon={<IconPark type="Back" />}
          className="absolute right-0 top-0"
          onClick={() => router.push(`/albums/${photo.albumId}`)}
        />
      </div>
    </div>
  );
}
