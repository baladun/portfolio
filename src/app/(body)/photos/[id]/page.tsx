import { RouteContext } from '@/types';
import { getPhoto, PathWithId, PhotoDto } from '@/api';
import { notFound } from 'next/navigation';
import { PhotoStatic } from '@/components/PhotoStatic';

export default async function Page({ params }: RouteContext<PathWithId>) {
  let photo: PhotoDto;

  try {
    photo = await getPhoto(params.id);
  } catch (e) {
    return notFound();
  }

  if (!photo) {
    return notFound();
  }

  return <PhotoStatic photo={photo} />;
}
