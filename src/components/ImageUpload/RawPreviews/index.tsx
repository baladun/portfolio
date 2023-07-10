import { RawPreviewsProps } from './types';
import { PreviewItem, Previews } from '@/components/Previews';
import { useLayoutEffect, useState } from 'react';
import { toPreviewItem, toPreviews } from './utils';
import { Attachment } from '../types';

export function RawPreviews({ attachments, selectedAttachment, onSelect, onReorder, onDelete, children }: RawPreviewsProps) {
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [selected, setSelected] = useState<PreviewItem | undefined>();

  useLayoutEffect(() => {
    setItems(toPreviews(attachments));
  }, [attachments]);

  useLayoutEffect(() => {
    setSelected(toPreviewItem(selectedAttachment));
  }, [selectedAttachment]);

  const handleSelect = (item: PreviewItem) => {
    const att = attachments.find(el => el.id === item.id);
    att && onSelect(att);
  };

  const handleReorder = (items: PreviewItem[]) => {
    const reordered = items.map(itm => attachments.find(att => att.id === itm.id) as Attachment);
    onReorder(reordered);
  };

  return (
    <Previews
      items={items}
      selected={selected}
      deletable
      className="py-3"
      onSelect={handleSelect}
      onReorder={handleReorder}
      onDelete={onDelete}
    >
      {children}
    </Previews>
  );
}
