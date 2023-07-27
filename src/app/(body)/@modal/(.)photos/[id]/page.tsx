import { cachedPhotos } from '@/utils/cached-photos';
import { Carousel } from '@/components/Carousel';
import { RouteContext } from '@/types';
import { PathWithId } from '@/api';
import { notFound } from 'next/navigation';

export default function Page({ params }: RouteContext<PathWithId>) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  return (
    <Carousel
      photoId={Number(params.id)}
      cachedPhotos={cachedPhotos.get()}
    />
  );
}
