import { Carousel } from '@/components/Carousel';
import { RouteContext } from '@/types';
import { PathWithId, withNumberIdValidationSchema } from '@/api-client';
import { InferType } from 'yup';

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    throw new Error();
  }

  return <Carousel photoId={params.id} />;
}
