import { PreviewItem } from '@/components/Previews';
import { Attachment } from '../types';

export function toPreviewItem(attachment: Attachment): PreviewItem {
  const {
    id,
    raw: {
      name,
      dataUrl,
      image: { naturalWidth, naturalHeight },
    },
  } = attachment;
  return {
    id,
    name,
    src: dataUrl,
    width: naturalWidth,
    height: naturalHeight,
  };
}

export function toPreviews(attachments: Attachment[]): PreviewItem[] {
  return attachments.map(att => toPreviewItem(att));
}
