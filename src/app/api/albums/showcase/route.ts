import { commonErrorRes, incorrectPayloadErrorRes, okRes } from '@/app/api/responses';
import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { ShowcaseAddDto, ShowcaseUpdateDto, toAlbumDto } from '@/api';
import { showcaseAddDtoValidationSchema, showcaseOrderUpdateDtoValidationSchema } from '@/api/utils';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const albums = await db.album.findMany({
      include: {
        coverImage: true,
      },
      where: {
        showcaseOrder: {
          not: null,
        },
      },
      orderBy: { showcaseOrder: Prisma.SortOrder.asc },
    });

    return okRes(albums.map(el => toAlbumDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  let dto: ShowcaseAddDto;
  try {
    dto = await showcaseAddDtoValidationSchema.validate(await req.json());
  } catch (e) {
    return incorrectPayloadErrorRes();
  }

  try {
    const { albumId } = dto;
    const lastIdx = await db.album
      .aggregate({
        _max: {
          showcaseOrder: true,
        },
      })
      .then(res => res._max.showcaseOrder);

    const album = await db.album.update({
      include: {
        coverImage: true,
      },
      where: {
        id: albumId,
      },
      data: {
        showcaseOrder: lastIdx != null ? lastIdx + 1 : 0,
      },
    });

    return okRes(toAlbumDto(album));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    let dtos: ShowcaseUpdateDto[];
    try {
      dtos = await showcaseOrderUpdateDtoValidationSchema.validate(await req.json());
    } catch (e) {
      return incorrectPayloadErrorRes();
    }

    // reset to avoid 'db unique constraint'
    await db.$transaction([
      ...dtos.map(({ albumId }) =>
        db.album.update({
          where: {
            id: albumId,
          },
          data: {
            showcaseOrder: null,
          },
        }),
      ),
    ]);

    const updated = await db.$transaction([
      ...dtos.map(({ albumId, order }) =>
        db.album.update({
          include: {
            coverImage: true,
          },
          where: {
            id: albumId,
          },
          data: {
            showcaseOrder: order,
          },
        }),
      ),
    ]);

    // shift order if needed
    if (updated.length === 1 && !updated[0].showcaseOrder) {
      const showcaseItems = await db.album.findMany({
        where: {
          showcaseOrder: {
            not: null,
          },
        },
        orderBy: { showcaseOrder: Prisma.SortOrder.asc },
      });

      if (showcaseItems.length) {
        const max = showcaseItems[showcaseItems.length - 1].showcaseOrder as number;
        let missing: number | undefined = undefined;

        for (let i = 0; i < max; i++) {
          if (showcaseItems[i].showcaseOrder !== i) {
            missing = i;
            break;
          }
        }

        if (missing != null) {
          await db.$transaction([
            db.album.updateMany({
              where: {
                showcaseOrder: {
                  gt: missing,
                },
              },
              data: {
                showcaseOrder: {
                  decrement: 1,
                },
              },
            }),
          ]);
        }
      }
    }

    return okRes(updated.map(el => toAlbumDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
