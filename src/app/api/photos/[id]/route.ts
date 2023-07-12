import { NextRequest } from 'next/server';
import { PathWithId, toPhotoDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, notFoundErrorRes, okRes } from '../../responses';

export async function DELETE(req: NextRequest, context: RouteContext<PathWithId>) {
  const { params } = context;

  if (!params || !params.id || isNaN(Number(params.id))) {
    return incorrectParamsErrorRes();
  }

  try {
    const id = Number(params.id);
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
