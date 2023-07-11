import { NextRequest } from 'next/server';
import { PathWithId, toAlbumDto } from '@/api';
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
    const albumToDelete = await db.album.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: Number(params.id),
      },
    });

    if (!albumToDelete) {
      return notFoundErrorRes();
    }

    await db.$transaction([
      db.album.updateMany({
        where: {
          categoryOrder: {
            gt: albumToDelete.categoryOrder,
          },
        },
        data: {
          categoryOrder: {
            decrement: 1,
          },
        },
      }),
      db.album.delete({
        where: {
          id: albumToDelete.id,
        },
      }),
    ]);

    if (albumToDelete.coverImageId) {
      await db.image.delete({ where: { id: albumToDelete.coverImageId } });
      await bucket.file(albumToDelete.coverImageId).delete({ ignoreNotFound: true });
    }

    return okRes(toAlbumDto(albumToDelete));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
