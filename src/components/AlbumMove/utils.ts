import { PreviewItem } from '@/components/Previews';
import { AlbumDto } from '@/api-client';
import { getPublicObjectUrl } from '@/utils';

export function mapToPreviews(albums: AlbumDto[]): PreviewItem[] {
  return (albums || []).map(({ id: categoryId, name, coverImage }) => {
    const { id: imageId, width, height } = coverImage || {};

    return {
      id: String(categoryId),
      name,
      src: imageId ? getPublicObjectUrl(imageId) : undefined,
      width,
      height,
    };
  });
}
