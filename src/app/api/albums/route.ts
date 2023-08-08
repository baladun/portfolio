import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { AlbumQueryParams, AlbumSortKey, AlbumCreateDto, toAlbumDto, AlbumUpdateOrderDto } from '@/api';
import { commonErrorRes, createdRes, incorrectParamsErrorRes, incorrectPayloadErrorRes, okRes } from '../responses';
import { albumQueryParamsValidationSchema, createAlbumDtoValidationSchema, updateAlbumOrderValidationSchema } from '@/api/utils';

export async function GET(req: NextRequest) {
  let queryParams: AlbumQueryParams;
  try {
    queryParams = await albumQueryParamsValidationSchema.validate(Object.fromEntries(req.nextUrl.searchParams));
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  const { categoryId, name, createdDateFrom, createdDateTo, sort } = queryParams;

  try {
    const [sortKey, sortDir] = (sort || '').split(',') as [AlbumSortKey, Prisma.SortOrder];
    const albums = await db.album.findMany({
      include: {
        coverImage: true,
      },
      where: {
        categoryId: categoryId ? Number(categoryId) : undefined,
        name: {
          contains: name,
          mode: 'insensitive',
        },
        createdAt: {
          gte: createdDateFrom,
          lte: createdDateTo,
        },
      },
      orderBy: !sort ? undefined : { [sortKey]: sortDir },
    });

    return okRes(albums.map(el => toAlbumDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    let dto: AlbumCreateDto;
    try {
      dto = await createAlbumDtoValidationSchema.validate(await req.json());
    } catch (e) {
      return incorrectPayloadErrorRes();
    }

    const { name, categoryId, description, coverImageId } = dto;
    const lastIdx = await db.album
      .aggregate({
        where: {
          categoryId,
        },
        _max: {
          categoryOrder: true,
        },
      })
      .then(res => res._max.categoryOrder);

    const created = await db.album.create({
      data: {
        name,
        coverImageId,
        description,
        categoryId,
        categoryOrder: lastIdx != null ? lastIdx + 1 : 0,
      },
    });

    const coverImage = await db.image.findFirst({ where: { id: coverImageId } });

    return createdRes(toAlbumDto({ ...created, coverImage }));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    let albums: AlbumUpdateOrderDto[];
    try {
      albums = await updateAlbumOrderValidationSchema.validate(await req.json());
    } catch (e) {
      return incorrectPayloadErrorRes();
    }

    const updated = await db.$transaction([
      ...albums.map(({ id, ...data }) =>
        db.album.update({
          include: {
            coverImage: true,
          },
          where: {
            id,
          },
          data,
        }),
      ),
    ]);

    return okRes(updated.map(el => toAlbumDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
