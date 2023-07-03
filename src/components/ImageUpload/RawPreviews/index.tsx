import { Children, memo, useState } from 'react';
import { RawPreviewsProps } from './types';
import { PreviewItem } from './PreviewItem';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Draggable } from './Draggable';
import { Attachment } from '../types';
import classnames from 'classnames';

export const RawPreviews = memo(function RawPreview({
  attachments,
  selectedAttachment,
  onSelect,
  onReorder,
  onDelete,
  children,
}: RawPreviewsProps) {
  const [draggingItem, setDraggingItem] = useState<Attachment | undefined>();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const att = attachments.find(el => el.id === active.id);
    setDraggingItem(att);
    document.body.style.cursor = 'grabbing';
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      const oldIndex = attachments.findIndex(att => att.id === active.id);
      const newIndex = attachments.findIndex(att => att.id === over!.id);

      onReorder(arrayMove(attachments, oldIndex, newIndex));
    }
    setDraggingItem(undefined);
    document.body.style.cursor = '';
  };

  return (
    <div className="max-w-2xl overflow-x-auto whitespace-nowrap py-3 leading-[0] [&::-webkit-scrollbar]:hidden [&>*:not(:last-child)]:mr-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={attachments}
          strategy={horizontalListSortingStrategy}
        >
          {attachments.map(att => (
            <Draggable
              key={att.id}
              id={att.id}
            >
              <PreviewItem
                attachment={att}
                showDelete={att.id !== draggingItem?.id}
                className={classnames(
                  selectedAttachment.id === att.id ? 'border-orange' : 'border-transparent',
                  draggingItem?.id === att.id ? 'opacity-20' : '',
                )}
                onClick={() => onSelect(att)}
                onDelete={() => onDelete(att.id)}
              />
            </Draggable>
          ))}
        </SortableContext>

        <DragOverlay>
          {draggingItem ? (
            <PreviewItem
              attachment={draggingItem}
              showDelete={false}
              className="border-0 border-transparent shadow-2xl transition"
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {Children.count(children) && <div className="inline-block h-28 w-28 align-top">{children}</div>}
    </div>
  );
});
