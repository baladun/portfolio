import { SsrErrors, SsrResponse } from '@/types';
import { AlbumDto, toAlbumDto } from '@/api';
import { Prisma } from '@prisma/client';
import { db } from '@/db';

export async function getSsrAlbums(): Promise<SsrResponse<AlbumDto[]>> {
  try {
    const albums = await db.album.findMany({
      include: {
        coverImage: true,
      },
      orderBy: { createdAt: Prisma.SortOrder.desc },
    });

    return albums.map(el => toAlbumDto(el));
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
