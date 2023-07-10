import { NextRequest } from 'next/server';
import { PathWithId, toCategoryDto } from '@/api';
import { RouteContext } from '@/types';
import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { bucket } from '@/bucket';
import { commonErrorRes, incorrectParamsErrorRes, notFoundErrorRes, okRes } from '../../responses';

export async function DELETE(req: NextRequest, context: RouteContext<PathWithId>) {
  const { params } = context;

  if (!params || !params.id) {
    return incorrectParamsErrorRes();
  }

  try {
    const toDelete = await db.category.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id: Number(params.id),
      },
    });

    if (!toDelete) {
      return notFoundErrorRes();
    }

    await db.$transaction(
      [
        db.category.updateMany({
          where: {
            order: {
              gt: toDelete.order,
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
            id: toDelete.id,
          },
        }),
      ],
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    if (toDelete.coverImageId) {
      await db.image.delete({ where: { id: toDelete.coverImageId } });
      await bucket.file(toDelete.coverImageId).delete({ ignoreNotFound: true });
    }

    return okRes(toCategoryDto(toDelete));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
