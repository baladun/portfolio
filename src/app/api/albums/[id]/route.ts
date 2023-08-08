import { NextRequest } from 'next/server';
import { PathWithId, toAlbumDto, AlbumUpdateDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, incorrectPayloadErrorRes, notFoundErrorRes, okRes } from '../../responses';
import { Album, Image } from '@prisma/client';
import { updateAlbumDtoValidationSchema, withNumberIdValidationSchema } from '@/api/utils';
import { InferType } from 'yup';

export async function GET(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const album = await db.album.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: params.id,
      },
    });

    if (!album) {
      return notFoundErrorRes();
    }

    return okRes(toAlbumDto(album));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function PUT(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  let dto: AlbumUpdateDto;
  try {
    dto = await updateAlbumDtoValidationSchema.validate(await req.json());
  } catch (e) {
    return incorrectPayloadErrorRes();
  }

  try {
    const curAlbum = await db.album.findFirst({
      where: {
        id: params.id,
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
              id: params.id,
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
                id: params.id,
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
              id: params.id,
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
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const albumToDelete = await db.album.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: params.id,
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
          id: params.id,
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
