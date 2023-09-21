import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { Cover } from '@/components/Cover';
import { AlbumEdit } from '@/components/AlbumEdit';
import { AlbumDelete } from '@/components/AlbumDelete';
import { Editable } from '@/components/Editable';
import { ssrResponseHasError } from '@/types';
import { notFound } from 'next/navigation';
import { getSsrAlbums } from './ssr';
import { getSsrCategories } from '../categories/ssr';

const { Heading, Text } = Typography;

export default async function Page() {
  const albumsRes = await getSsrAlbums();
  const categoriesRes = await getSsrCategories();

  if (ssrResponseHasError(albumsRes) || ssrResponseHasError(categoriesRes)) {
    return notFound();
  }

  return (
    <PageLayout
      backHref="/"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          albums
        </Heading>
      }
    >
      {albumsRes.map(el => (
        <Cover
          key={el.id}
          image={el.coverImage}
          href={{
            pathname: `/albums/${el.id}`,
          }}
          subtitle={
            <Text
              color="snow"
              size="sm"
              className="block text-center"
            >
              {el.name}
            </Text>
          }
          actions={
            <Editable>
              <AlbumEdit
                album={el}
                categories={categoriesRes}
              />
              <AlbumDelete album={el} />
            </Editable>
          }
        />
      ))}
    </PageLayout>
  );
}
