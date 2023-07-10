import { PropsWithChildren } from 'react';

export interface PreviewsProps extends PropsWithChildren {
  items: PreviewItem[];
  selected?: PreviewItem;
  className?: string;
  deletable?: boolean;
  onSelect?: (item: PreviewItem) => void;
  onReorder?: (items: PreviewItem[]) => void;
  onDelete?: (id: PreviewItem['id']) => void;
}

export interface PreviewItem {
  id: string;
  name: string;
  src?: string;
  width?: number;
  height?: number;
}
