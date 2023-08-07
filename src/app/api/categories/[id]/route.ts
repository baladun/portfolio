import { NextRequest } from 'next/server';
import { PathWithId, toCategoryDto } from '@/api';
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

    const albumCoverIdsToDelete = await db.album
      .findMany({
        where: {
          categoryId: categoryToDelete.id,
        },
      })
      .then(albums => albums.map(el => el.coverImageId).filter(Boolean) as string[]);

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
    ]);

    if (categoryToDelete.coverImageId) {
      await db.image.delete({ where: { id: categoryToDelete.coverImageId } });
      await bucket.file(categoryToDelete.coverImageId).delete({ ignoreNotFound: true });
    }

    if (albumCoverIdsToDelete.length) {
      await db.$transaction([
        ...albumCoverIdsToDelete.map(id =>
          db.image.delete({
            where: {
              id,
            },
          }),
        ),
      ]);

      await Promise.allSettled(albumCoverIdsToDelete.map(id => bucket.file(id).delete({ ignoreNotFound: true })));
    }

    return okRes(toCategoryDto(categoryToDelete));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
