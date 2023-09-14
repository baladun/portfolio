import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { Cover } from '@/components/Cover';
import { getAlbums } from '@/api';
import { AlbumEdit } from '@/components/AlbumEdit';
import { AlbumDelete } from '@/components/AlbumDelete';
import { Editable } from '@/components/Editable';

const { Heading, Text } = Typography;

export default async function Page() {
  const albums = await getAlbums({ sort: 'createdAt,desc' });

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
      {albums.map(el => (
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
              <AlbumEdit album={el} />
              <AlbumDelete album={el} />
            </Editable>
          }
        />
      ))}
    </PageLayout>
  );
}
