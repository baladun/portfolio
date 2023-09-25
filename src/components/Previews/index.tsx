import { Children, memo, useEffect, useRef, useState } from 'react';
import { PreviewItem, PreviewsProps } from './types';
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
import { Item } from './Item';
import classnames from 'classnames';
import { usePrevious } from '@/hooks';

const Previews = memo(function Previews({ items, selected, deletable, onSelect, onReorder, onDelete, className, children }: PreviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevItems = usePrevious(items);
  const [dragging, setDragging] = useState<PreviewItem>();
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

  useEffect(() => {
    if (prevItems && items.length > prevItems.length) {
      containerRef.current?.scrollTo({ left: 10000, behavior: 'smooth' });
    }
  }, [items]);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const itm = items.find(itm => itm.id === active.id);
    setDragging(itm);
    document.body.style.cursor = 'grabbing';
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      const oldIndex = items.findIndex(itm => itm.id === active.id);
      const newIndex = items.findIndex(itm => itm.id === over!.id);

      onReorder?.(arrayMove(items, oldIndex, newIndex));
    }
    setDragging(undefined);
    document.body.style.cursor = '';
  };

  return (
    <div
      ref={containerRef}
      className={classnames(
        'overflow-x-auto whitespace-nowrap leading-[0] [&::-webkit-scrollbar]:hidden [&>*:not(:last-child)]:mr-1.5',
        className,
      )}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items}
          strategy={horizontalListSortingStrategy}
        >
          {items.map(itm => (
            <Draggable
              key={itm.id}
              id={itm.id}
            >
              <Item
                data={itm}
                deletable={deletable && itm.id !== dragging?.id}
                className={classnames(
                  selected?.id === itm.id ? 'outline outline-2 -outline-offset-2 outline-orange' : '',
                  dragging?.id === itm.id ? 'opacity-20' : '',
                )}
                title={itm.name}
                onClick={() => onSelect?.(itm)}
                onDelete={() => onDelete?.(itm.id)}
              />
            </Draggable>
          ))}
        </SortableContext>

        <DragOverlay>
          {dragging ? (
            <Item
              data={dragging}
              deletable={false}
              className="border-0 border-transparent shadow-2xl transition"
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {Boolean(Children.count(children)) && <div className="inline-block h-28 w-28 align-top">{children}</div>}
    </div>
  );
});

export { Previews };
export type { PreviewItem };
