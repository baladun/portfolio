import { db } from '@/db';
import { AlbumDto, CategoryDto, toAlbumDto, toCategoryDto } from '@/api-client';
import { SsrErrors, SsrResponse } from '@/types';
import { Prisma } from '@prisma/client';

export async function getSsrCategory(id: number): Promise<SsrResponse<CategoryDto>> {
  try {
    const category = await db.category.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id,
      },
    });

    if (!category) {
      return SsrErrors.NotFound;
    }

    return toCategoryDto(category);
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}

export async function getSsrCategoryAlbums(categoryId: number): Promise<SsrResponse<AlbumDto[]>> {
  try {
    const albums = await db.album.findMany({
      include: {
        coverImage: true,
      },
      where: {
        categoryId,
      },
      orderBy: { categoryOrder: Prisma.SortOrder.asc },
    });

    return albums.map(el => toAlbumDto(el));
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
