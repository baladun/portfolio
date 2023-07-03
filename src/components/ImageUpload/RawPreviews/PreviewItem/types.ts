import { Attachment } from '../../types';
import { HTMLAttributes } from 'react';

export type PreviewItemProps = {
  attachment: Attachment;
  showDelete?: boolean;
  onDelete?: () => void;
} & HTMLAttributes<HTMLDivElement>;
