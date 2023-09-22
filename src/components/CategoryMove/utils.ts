import { PreviewItem } from '@/components/Previews';
import { CategoryDto } from '@/api-client';
import { getPublicObjectUrl } from '@/utils';

export function mapToPreviews(categories: CategoryDto[]): PreviewItem[] {
  return (categories || []).map(({ id: categoryId, name, coverImage }) => {
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
