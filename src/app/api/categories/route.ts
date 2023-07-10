import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { CreateCategoryDto, toCategoryDto, UpdateCategoryDto } from '@/api';
import { commonErrorRes, createdRes, incorrectPayloadErrorRes, okRes } from '../responses';

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        coverImage: true,
      },
      orderBy: [{ order: Prisma.SortOrder.asc }],
    });

    return okRes(categories.map(el => toCategoryDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, coverImageId } = (await req.json()) as CreateCategoryDto;
    const lastIdx = await db.category
      .aggregate({
        _max: {
          order: true,
        },
      })
      .then(res => res._max.order);

    const created = await db.category.create({
      data: {
        name,
        coverImageId,
        order: lastIdx != null ? lastIdx + 1 : 0,
      },
    });

    const coverImage = await db.image.findFirst({ where: { id: coverImageId } });

    return createdRes(toCategoryDto({ ...created, coverImage }));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const categories = (await req.json()) as UpdateCategoryDto[];

    if (!categories || !Array.isArray(categories) || !categories.length) {
      return incorrectPayloadErrorRes();
    }

    const updated = await db.$transaction([
      ...categories.map(({ id, ...data }) =>
        db.category.update({
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

    return okRes(updated.map(el => toCategoryDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}