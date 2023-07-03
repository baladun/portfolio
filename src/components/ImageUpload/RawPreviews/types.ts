import { Attachment } from '../types';
import { PropsWithChildren } from 'react';

export interface RawPreviewsProps extends PropsWithChildren {
  attachments: Attachment[];
  selectedAttachment: Attachment;
  onSelect: (item: Attachment) => void;
  onReorder: (items: Attachment[]) => void;
  onDelete: (id: Attachment['id']) => void;
}
