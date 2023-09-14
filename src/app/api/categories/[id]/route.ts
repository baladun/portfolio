import { NextRequest } from 'next/server';
import { PathWithId, toCategoryDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, notFoundErrorRes, okRes, unauthorizedRes } from '../../responses';
import { InferType } from 'yup';
import { withNumberIdValidationSchema } from '@/api/utils';
import { Photo } from '@prisma/client';
import { isAuthorized } from '../../is-authorized';

export async function GET(req: NextRequest, context: RouteContext<PathWithId>) {
  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const category = await db.category.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return notFoundErrorRes();
    }

    return okRes(toCategoryDto(category));
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

  let params: InferType<typeof withNumberIdValidationSchema>;
  try {
    params = await withNumberIdValidationSchema.validate(context.params);
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  try {
    const categoryToDelete = await db.category.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: params.id,
      },
    });

    if (!categoryToDelete) {
      return notFoundErrorRes();
    }

    const albumsToDelete = await db.album.findMany({
      where: {
        categoryId: categoryToDelete.id,
      },
    });
    const albumCoverIdsToDelete = albumsToDelete.map(el => el.coverImageId).filter(Boolean) as string[];
    const photosToDelete = (
      !albumsToDelete.length
        ? []
        : await db.photo.findMany({
            where: {
              OR: albumsToDelete.map(({ id }) => ({ albumId: id })),
            },
          })
    ) as Photo[];
    const photoImageIdsToDelete = photosToDelete.map(el => el.imageId);

    await db.$transaction([
      db.category.updateMany({
        where: {
          order: {
            gt: categoryToDelete.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      }),
      db.category.delete({
        where: {
          id: categoryToDelete.id,
        },
      }),
      ...(albumCoverIdsToDelete.length ? albumCoverIdsToDelete.map(id => db.image.delete({ where: { id } })) : []),
      ...(photoImageIdsToDelete.length ? photoImageIdsToDelete.map(id => db.image.delete({ where: { id } })) : []),
    ]);

    if (categoryToDelete.coverImageId) {
      await db.image.delete({ where: { id: categoryToDelete.coverImageId } });
      await bucket.file(categoryToDelete.coverImageId).delete({ ignoreNotFound: true });
    }

    if (albumCoverIdsToDelete.length || photoImageIdsToDelete.length) {
      await Promise.allSettled(
        [...albumCoverIdsToDelete, ...photoImageIdsToDelete].map(id => bucket.file(id).delete({ ignoreNotFound: true })),
      );
    }

    return okRes(toCategoryDto(categoryToDelete));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
