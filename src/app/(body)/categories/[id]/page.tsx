import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { CategoryDto, getAlbums, getCategory, PathWithId } from '@/api';
import { PageRouteProps, RouteContext } from '@/types';
import { Cover } from '@/components/Cover';
import { notFound } from 'next/navigation';
import { AlbumAdd } from '@/components/AlbumAdd';
import { AlbumMove } from '@/components/AlbumMove';
import { AlbumDelete } from '@/components/AlbumDelete';
import { AlbumEdit } from '@/components/AlbumEdit';
import { Editable } from '@/components/Editable';
import { Metadata } from 'next';

const { Heading, Text } = Typography;

export async function generateMetadata({ params }: PageRouteProps): Promise<Metadata> {
  const categoryId = Number(params.id);

  if (isNaN(categoryId)) {
    return {};
  }

  let category: CategoryDto;
  try {
    category = await getCategory(categoryId);
  } catch (e) {
    return {};
  }

  return {
    title: `Photographer Warsaw ${category.name}`,
  };
}

export default async function Page({ params }: RouteContext<PathWithId>) {
  const categoryId = Number(params.id);

  if (isNaN(categoryId)) {
    return notFound();
  }

  let category: CategoryDto;
  try {
    category = await getCategory(categoryId);
  } catch (e) {
    return notFound();
  }

  const albums = await getAlbums({ categoryId, sort: 'categoryOrder,asc' });

  return (
    <PageLayout
      backHref="/categories"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          categorIes / <wbr /> {category.name}
          {albums?.length > 1 ? (
            <Editable>
              <AlbumMove
                albums={albums}
                className="ml-3 align-top"
              />
            </Editable>
          ) : null}
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

      <Editable>
        <AlbumAdd categoryId={categoryId} />
      </Editable>
    </PageLayout>
  );
}
