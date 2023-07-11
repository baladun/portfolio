import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { AlbumQueryParams, CreateAlbumDto, toAlbumDto, UpdateAlbumDto } from '@/api';
import { commonErrorRes, createdRes, incorrectPayloadErrorRes, okRes } from '../responses';

export async function GET(req: NextRequest) {
  const { categoryId, name, createdDateFrom, createdDateTo } = Object.fromEntries(req.nextUrl.searchParams) as AlbumQueryParams;

  try {
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
      orderBy: [{ categoryOrder: Prisma.SortOrder.asc }],
    });

    return okRes(albums.map(el => toAlbumDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, categoryId, description, coverImageId } = (await req.json()) as CreateAlbumDto;
    const lastIdx = await db.album
      .aggregate({
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
    const albums = (await req.json()) as UpdateAlbumDto[];

    if (!albums || !Array.isArray(albums) || !albums.length) {
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
