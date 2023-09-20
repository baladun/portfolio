import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { PathWithId } from '@/api';
import { PageRouteProps, RouteContext, ssrResponseHasError } from '@/types';
import { Cover } from '@/components/Cover';
import { notFound } from 'next/navigation';
import { PhotoAdd } from '@/components/PhotoAdd';
import { PhotoMove } from '@/components/PhotoMove';
import { PhotoDelete } from '@/components/PhotoDelete';
import { cachedPhotos } from '@/utils/cached-photos';
import { Editable } from '@/components/Editable';
import { Metadata } from 'next';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api/utils';
import { getSsrAlbumPhotos, getSsrAlbumRes } from './ssr';

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

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return notFound();
  }

  const albumRes = await getSsrAlbumRes(params.id);
  const photosRes = await getSsrAlbumPhotos(params.id);

  if (ssrResponseHasError(albumRes) || ssrResponseHasError(photosRes)) {
    return notFound();
  }

  cachedPhotos.set(photosRes);

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

      <Editable>
        <PhotoAdd albumId={params.id} />
      </Editable>
    </PageLayout>
  );
}
