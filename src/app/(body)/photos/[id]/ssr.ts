import { SsrErrors, SsrResponse } from '@/types';
import { PhotoDto, toPhotoDto } from '@/api-client';
import { db } from '@/db';

export async function getSsrPhoto(id: number): Promise<SsrResponse<PhotoDto>> {
  try {
    const photo = await db.photo.findFirst({
      include: {
        image: true,
      },
      where: {
        id,
      },
    });

    if (!photo) {
      return SsrErrors.NotFound;
    }

    return toPhotoDto(photo);
  } catch (e: any) {
    return SsrErrors.Internal;
  }
}
