import { RouteContext, SsrErrors, ssrResponseHasError } from '@/types';
import { PathWithId } from '@/api-client';
import { notFound } from 'next/navigation';
import { PhotoStatic } from '@/components/PhotoStatic';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api-client';
import { getSsrPhoto } from './ssr';

export default async function Page(context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;

  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    throw new Error();
  }

  const photoRes = await getSsrPhoto(params.id);

  if (ssrResponseHasError(photoRes)) {
    if (photoRes === SsrErrors.Internal) {
      throw new Error();
    }

    return notFound();
  }

  return <PhotoStatic photo={photoRes} />;
}
