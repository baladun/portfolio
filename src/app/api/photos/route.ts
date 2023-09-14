import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { PhotosCreateDto, PhotoQueryParams, PhotoSortKey, toPhotoDto, PhotoOrderUpdateDto } from '@/api';
import { commonErrorRes, incorrectParamsErrorRes, incorrectPayloadErrorRes, okRes, unauthorizedRes } from '../responses';
import { createPhotoDtoValidationSchema, photoQueryParamsValidationSchema, updatePhotoOrderValidationSchema } from '@/api/utils';
import { isAuthorized } from '../is-authorized';

export async function GET(req: NextRequest) {
  let queryParams: PhotoQueryParams;
  try {
    queryParams = await photoQueryParamsValidationSchema.validate(Object.fromEntries(req.nextUrl.searchParams));
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  const { albumId, createdDateFrom, createdDateTo, sort } = queryParams;

  try {
    const [sortKey, sortDir] = (sort || '').split(',') as [PhotoSortKey, Prisma.SortOrder];
    const photos = await db.photo.findMany({
      include: {
        image: true,
      },
      where: {
        albumId: albumId ? Number(albumId) : undefined,
        createdAt: {
          gte: createdDateFrom,
          lte: createdDateTo,
        },
      },
      orderBy: !sort ? undefined : { [sortKey]: sortDir },
    });

    return okRes(photos.map(el => toPhotoDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await isAuthorized(req);
  } catch (e: any) {
    return unauthorizedRes();
  }

  let dto: PhotosCreateDto;
  try {
    dto = await createPhotoDtoValidationSchema.validate(await req.json());
  } catch (e) {
    return incorrectPayloadErrorRes();
  }

  try {
    const { albumId, imageIds } = dto;
    const lastIdx = await db.photo
      .aggregate({
        where: {
          albumId,
        },
        _max: {
          order: true,
        },
      })
      .then(res => res._max.order);

    const startIdx = lastIdx != null ? lastIdx + 1 : 0;
    await db.photo.createMany({
      data: imageIds.map((imageId, idx) => ({
        albumId,
        imageId,
        order: startIdx + idx,
      })),
    });

    const created = await db.photo.findMany({
      include: {
        image: true,
      },
      where: {
        albumId,
        order: {
          gte: startIdx,
        },
      },
    });

    return okRes(created.map(el => toPhotoDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await isAuthorized(req);
  } catch (e: any) {
    return unauthorizedRes();
  }

  try {
    let dtos: PhotoOrderUpdateDto[];
    try {
      dtos = await updatePhotoOrderValidationSchema.validate(await req.json());
    } catch (e) {
      return incorrectPayloadErrorRes();
    }

    const updated = await db.$transaction([
      ...dtos.map(({ id, ...data }) =>
        db.photo.update({
          include: {
            image: true,
          },
          where: {
            id,
          },
          data,
        }),
      ),
    ]);

    return okRes(updated.map(el => toPhotoDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
