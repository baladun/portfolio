import { db } from '@/db';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { CategoryQueryParams, CategorySortKey, CategoryCreateDto, toCategoryDto, CategoryUpdateDto } from '@/api';
import { commonErrorRes, createdRes, incorrectParamsErrorRes, incorrectPayloadErrorRes, okRes } from '../responses';
import { categoryQueryParamsValidationSchema, createCategoryDtoValidationSchema, updateCategoryOrderValidationSchema } from '@/api/utils';

export async function GET(req: NextRequest) {
  let queryParams: CategoryQueryParams;
  try {
    queryParams = await categoryQueryParamsValidationSchema.validate(Object.fromEntries(req.nextUrl.searchParams));
  } catch (e) {
    return incorrectParamsErrorRes();
  }

  const { createdDateFrom, createdDateTo, sort } = queryParams;

  try {
    const [sortKey, sortDir] = (sort || '').split(',') as [CategorySortKey, Prisma.SortOrder];
    const categories = await db.category.findMany({
      include: {
        coverImage: true,
      },
      where: {
        createdAt: {
          gte: createdDateFrom,
          lte: createdDateTo,
        },
      },
      orderBy: !sort ? undefined : { [sortKey]: sortDir },
    });

    return okRes(categories.map(el => toCategoryDto(el)));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    let dto: CategoryCreateDto;
    try {
      dto = await createCategoryDtoValidationSchema.validate(await req.json());
    } catch (e) {
      return incorrectPayloadErrorRes();
    }

    const { name, coverImageId } = dto;
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
    let categories: CategoryUpdateDto[];
    try {
      categories = await updateCategoryOrderValidationSchema.validate(await req.json());
    } catch (e) {
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
