import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { AlbumDto, getAlbum, getPhotos, PathWithId } from '@/api';
import { RouteContext } from '@/types';
import { Cover } from '@/components/Cover';
import { notFound } from 'next/navigation';
import { PhotoAdd } from '@/components/PhotoAdd';
import { PhotoMove } from '@/components/PhotoMove';
import { PhotoDelete } from '@/components/PhotoDelete';
import { cachedPhotos } from '@/utils/cached-photos';

const { Heading } = Typography;

export default async function Page({ params }: RouteContext<PathWithId>) {
  const albumId = Number(params.id);

  if (isNaN(albumId)) {
    return notFound();
  }

  let album: AlbumDto;
  try {
    album = await getAlbum(albumId);
  } catch (e) {
    return notFound();
  }

  const photos = await getPhotos({ albumId, sort: 'order,asc' });
  cachedPhotos.set(photos);

  return (
    <PageLayout
      backHref="/albums"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          albums / <wbr /> {album.name}
          <PhotoMove
            photos={photos}
            className="ml-3 align-top"
          />
        </Heading>
      }
    >
      {photos.map(el => (
        <Cover
          key={el.id}
          image={el.image}
          href={{
            pathname: `/photos/${el.id}`,
          }}
          actions={<PhotoDelete photo={el} />}
        />
      ))}

      <PhotoAdd albumId={albumId} />
    </PageLayout>
  );
}
