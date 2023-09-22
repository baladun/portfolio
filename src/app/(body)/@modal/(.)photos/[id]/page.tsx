import { cachedPhotos } from '@/utils/cached-photos';
import { Carousel } from '@/components/Carousel';
import { RouteContext } from '@/types';
import { PathWithId } from '@/api';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api/utils';

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    throw new Error();
  }

  return (
    <Carousel
      photoId={params.id}
      cachedPhotos={cachedPhotos.get()}
    />
  );
}
