import { NextRequest, NextResponse } from 'next/server';
import { RouteContext } from '@/types';
import { PathWithId, toImageDto } from '@/api';
import { commonErrorRes, incorrectParamsErrorRes, notFoundErrorRes, okRes, unauthorizedRes } from '../../responses';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { InferType } from 'yup';
import { withStringIdValidationSchema } from '@/api/utils';
import { isAuthorized } from '../../is-authorized';

export async function GET(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withStringIdValidationSchema>;
  try {
    params = await withStringIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  const { id } = params;

  try {
    const image = await db.image.findFirst({ where: { id } });

    if (!image) {
      return notFoundErrorRes();
    }

    const bucketRes = await bucket.file(id).download();

    if (!bucketRes?.length) {
      return notFoundErrorRes();
    }

    const buffer = bucketRes[0];
    const res = new NextResponse<ArrayBuffer>(buffer);
    res.headers.set('Content-Type', image.mime);
    res.headers.set('Content-Length', String(buffer.length));

    return res;
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext<PathWithId>) {
  try {
    await isAuthorized(req);
  } catch (e: any) {
    return unauthorizedRes();
  }

  let params: InferType<typeof withStringIdValidationSchema>;
  try {
    params = await withStringIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  const { id } = params;

  try {
    const image = await db.image.findFirst({ where: { id } });

    if (!image) {
      return notFoundErrorRes();
    }

    await db.image.delete({ where: { id } });
    await bucket.file(id).delete({ ignoreNotFound: true });

    return okRes(toImageDto(image));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
