import { HTMLAttributes } from 'react';
import { PreviewItem } from '../types';

export type ItemProps = {
  data: PreviewItem;
  deletable?: boolean;
  onDelete?: () => void;
} & HTMLAttributes<HTMLDivElement>;
