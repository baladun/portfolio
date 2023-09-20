import { CategoryDto, toCategoryDto } from '@/api';
import { Prisma } from '@prisma/client';
import { db } from '@/db';
import { SsrErrors, SsrResponse } from '@/types';

export async function getSsrCategories(): Promise<SsrResponse<CategoryDto[]>> {
  try {
    const categories = await db.category.findMany({
      include: {
        coverImage: true,
      },
      orderBy: { order: Prisma.SortOrder.asc },
    });

    return categories.map(el => toCategoryDto(el));
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
