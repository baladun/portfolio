import { SsrErrors, SsrResponse } from '@/types';
import { AlbumDto, toAlbumDto } from '@/api-client';
import { db } from '@/db';
import { Prisma } from '@prisma/client';

export async function getSsrShowcase(): Promise<SsrResponse<AlbumDto[]>> {
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

    return albums.map(el => toAlbumDto(el));
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
