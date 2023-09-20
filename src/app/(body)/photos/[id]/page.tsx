import { RouteContext, ssrResponseHasError } from '@/types';
import { PathWithId } from '@/api';
import { notFound } from 'next/navigation';
import { PhotoStatic } from '@/components/PhotoStatic';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api/utils';
import { getSsrPhoto } from './ssr';

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return notFound();
  }

  const photoRes = await getSsrPhoto(params.id);

  if (ssrResponseHasError(photoRes)) {
    return notFound();
  }

  return <PhotoStatic photo={photoRes} />;
}
