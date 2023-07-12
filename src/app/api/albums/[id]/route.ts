import { NextRequest } from 'next/server';
import { PathWithId, toAlbumDto, UpdateAlbumDto, UpdateAlbumOrderDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, incorrectPayloadErrorRes, notFoundErrorRes, okRes } from '../../responses';
import { Album, Image } from '@prisma/client';

export async function PUT(req: NextRequest, context: RouteContext<PathWithId>) {
  const { params } = context;

  if (!params || !params.id || isNaN(Number(params.id))) {
    return incorrectParamsErrorRes();
  }

  const dto = (await req.json()) as UpdateAlbumDto;
  if (!dto) {
    return incorrectPayloadErrorRes();
  }

  try {
    const id = Number(params.id);

    const curAlbum = await db.album.findFirst({
      where: {
        id,
      },
    });

    if (!curAlbum) {
      return notFoundErrorRes();
    }

    const updated = await new Promise<Album & { coverImage: Image | null }>(async (res, rej) => {
      try {
        if (curAlbum.categoryId === dto.categoryId) {
          const updated = await db.album.update({
            include: {
              coverImage: true,
            },
            where: {
              id,
            },
            data: dto,
          });
          res(updated);
        } else {
          const lastIdx = await db.album
            .aggregate({
              where: {
                categoryId: dto.categoryId,
              },
              _max: {
                categoryOrder: true,
              },
            })
            .then(res => res._max.categoryOrder);

          await db.$transaction([
            db.album.update({
              where: {
                id,
              },
              data: {
                ...dto,
                categoryOrder: lastIdx != null ? lastIdx + 1 : 0,
              },
            }),
            db.album.updateMany({
              where: {
                categoryId: curAlbum.categoryId,
                categoryOrder: {
                  gt: curAlbum.categoryOrder,
                },
              },
              data: {
                categoryOrder: {
                  decrement: 1,
                },
              },
            }),
          ]);

          const updated = await db.album.findFirst({
            include: {
              coverImage: true,
            },
            where: {
              id,
            },
          });
          updated && res(updated);
        }
      } catch (e: any) {
        rej(e);
      }
    });

    return okRes(toAlbumDto(updated));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext<PathWithId>) {
  const { params } = context;

  if (!params || !params.id || isNaN(Number(params.id))) {
    return incorrectParamsErrorRes();
  }

  try {
    const id = Number(params.id);
    const albumToDelete = await db.album.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id,
      },
    });

    if (!albumToDelete) {
      return notFoundErrorRes();
    }

    await db.$transaction([
      db.album.updateMany({
        where: {
          categoryId: albumToDelete.categoryId,
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
          id,
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
