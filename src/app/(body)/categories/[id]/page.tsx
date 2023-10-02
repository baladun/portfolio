import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { PathWithId } from '@/api-client';
import { PageRouteProps, RouteContext, SsrErrors, ssrResponseHasError } from '@/types';
import { Cover } from '@/components/Cover';
import { notFound } from 'next/navigation';
import { AlbumAdd } from '@/components/AlbumAdd';
import { AlbumMove } from '@/components/AlbumMove';
import { AlbumDelete } from '@/components/AlbumDelete';
import { AlbumEdit } from '@/components/AlbumEdit';
import { Editable } from '@/components/Editable';
import { Metadata } from 'next';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api-client';
import { getSsrCategory, getSsrCategoryAlbums } from './ssr';
import { getSsrCategories } from '../../categories/ssr';

const { Heading, Text } = Typography;

export async function generateMetadata(context: PageRouteProps): Promise<Metadata> {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return {};
  }

  const categoryRes = await getSsrCategory(params.id);

  if (ssrResponseHasError(categoryRes)) {
    return {};
  }

  return {
    title: `Photographer Warsaw ${categoryRes.name}`,
  };
}

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    throw new Error();
  }

  const categoryRes = await getSsrCategory(params.id);
  const albumsRes = await getSsrCategoryAlbums(params.id);
  const categoriesRes = await getSsrCategories();

  if (ssrResponseHasError(categoryRes) || ssrResponseHasError(albumsRes) || ssrResponseHasError(categoriesRes)) {
    if (categoryRes === SsrErrors.Internal || albumsRes === SsrErrors.Internal || categoriesRes === SsrErrors.Internal) {
      throw new Error();
    }

    return notFound();
  }

  return (
    <PageLayout
      backHref="/categories"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          categorIes / <wbr /> <span className="whitespace-normal">{categoryRes.name}</span>
          {albumsRes?.length > 1 ? (
            <Editable>
              <AlbumMove
                albums={albumsRes}
                className="ml-3 align-top"
              />
            </Editable>
          ) : null}
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

      <Editable>
        <AlbumAdd categoryId={params.id} />
      </Editable>
    </PageLayout>
  );
}
