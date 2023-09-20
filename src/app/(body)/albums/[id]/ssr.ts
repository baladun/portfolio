import { SsrErrors, SsrResponse } from '@/types';
import { AlbumDto, PhotoDto, toAlbumDto, toPhotoDto } from '@/api';
import { db } from '@/db';
import { Prisma } from '@prisma/client';

export async function getSsrAlbumRes(id: number): Promise<SsrResponse<AlbumDto>> {
  try {
    const album = await db.album.findFirst({
      include: {
        coverImage: true,
      },
      where: {
        id,
      },
    });

    if (!album) {
      return SsrErrors.NotFound;
    }

    return toAlbumDto(album);
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}

export async function getSsrAlbumPhotos(albumId: number): Promise<SsrResponse<PhotoDto[]>> {
  try {
    const photos = await db.photo.findMany({
      include: {
        image: true,
      },
      where: {
        albumId,
      },
      orderBy: { order: Prisma.SortOrder.asc },
    });

    return photos.map(el => toPhotoDto(el));
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
