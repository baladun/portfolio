import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { PathWithId } from '@/api-client';
import { PageRouteProps, RouteContext, SsrErrors, ssrResponseHasError } from '@/types';
import { Cover } from '@/components/Cover';
import { notFound } from 'next/navigation';
import { PhotoAdd } from '@/components/PhotoAdd';
import { PhotoMove } from '@/components/PhotoMove';
import { PhotoDelete } from '@/components/PhotoDelete';
import { Editable } from '@/components/Editable';
import { Metadata } from 'next';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api-client';
import { getSsrAlbumPhotos, getSsrAlbumRes } from './ssr';
import { getSsrShowcase } from '../../ssr';
import { AlbumPhotosHelper } from '@/components/AlbumPhotosHelper';

const { Heading } = Typography;

export async function generateMetadata(context: PageRouteProps): Promise<Metadata> {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return {};
  }

  const albumRes = await getSsrAlbumRes(params.id);

  if (ssrResponseHasError(albumRes)) {
    return {};
  }

  return {
    title: `${albumRes.name}`,
  };
}

export async function generateStaticParams() {
  const showcaseAlbumsRes = await getSsrShowcase();

  if (ssrResponseHasError(showcaseAlbumsRes)) {
    return [];
  }

  return showcaseAlbumsRes.map(({ id }) => id);
}

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    throw new Error();
  }

  const albumRes = await getSsrAlbumRes(params.id);
  const photosRes = await getSsrAlbumPhotos(params.id);

  if (ssrResponseHasError(albumRes) || ssrResponseHasError(photosRes)) {
    if (albumRes === SsrErrors.Internal || photosRes === SsrErrors.Internal) {
      throw new Error();
    }

    return notFound();
  }

  return (
    <PageLayout
      backHref="/albums"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          albums / <wbr /> {albumRes.name}
          {photosRes?.length > 1 ? (
            <Editable>
              <PhotoMove
                photos={photosRes}
                className="ml-3 align-top"
              />
            </Editable>
          ) : null}
        </Heading>
      }
    >
      {photosRes.map(el => (
        <Cover
          key={el.id}
          image={el.image}
          imageCssClass="!cursor-zoom-in"
          href={{
            pathname: `/photos/${el.id}`,
          }}
          actions={
            <Editable>
              <PhotoDelete photo={el} />
            </Editable>
          }
        />
      ))}

      <AlbumPhotosHelper photos={photosRes} />

      <Editable>
        <PhotoAdd albumId={params.id} />
      </Editable>
    </PageLayout>
  );
}
