import { PreviewItem } from '@/components/Previews';
import { PhotoDto } from '@/api-client';
import { getPublicObjectUrl } from '@/utils';

export function mapToPreviews(photos: PhotoDto[]): PreviewItem[] {
  return (photos || []).map(({ id, image }) => {
    const { id: imageId, width, height } = image;

    return {
      id: String(id),
      name: imageId,
      src: getPublicObjectUrl(imageId),
      width,
      height,
    };
  });
}
