import { PropsWithChildren } from 'react';
import { Attachment } from '../types';

export interface RawPreviewsProps extends PropsWithChildren {
  attachments: Attachment[];
  selectedAttachment: Attachment;
  onSelect: (item: Attachment) => void;
  onReorder: (items: Attachment[]) => void;
  onDelete: (id: Attachment['id']) => void;
}
