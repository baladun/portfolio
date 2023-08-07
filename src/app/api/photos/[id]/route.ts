import { NextRequest } from 'next/server';
import { PathWithId, toPhotoDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, notFoundErrorRes, okRes } from '../../responses';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api/utils';

export async function GET(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const photo = await db.photo.findFirst({
      include: {
        image: true,
      },
      where: {
        id: Number(params.id),
      },
    });

    if (!photo) {
      return notFoundErrorRes();
    }

    return okRes(toPhotoDto(photo));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const { id } = params;
    const photoToDelete = await db.photo.findFirst({
      include: {
        image: true,
      },
      where: {
        id,
      },
    });

    if (!photoToDelete) {
      return notFoundErrorRes();
    }

    await db.$transaction([
      db.photo.updateMany({
        where: {
          albumId: photoToDelete.albumId,
          order: {
            gt: photoToDelete.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      }),
      db.photo.delete({
        where: {
          id,
        },
      }),
      db.image.delete({
        where: {
          id: photoToDelete.imageId,
        },
      }),
    ]);

    await bucket.file(photoToDelete.imageId).delete({ ignoreNotFound: true });

    return okRes(toPhotoDto(photoToDelete));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
