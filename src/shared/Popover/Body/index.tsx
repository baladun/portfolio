import { usePopoverContext } from '../hooks';
import { forwardRef, HTMLProps } from 'react';
import { FloatingArrow, FloatingFocusManager, FloatingPortal, useMergeRefs, useTransitionStyles } from '@floating-ui/react';
import { bodyTransitionStyles } from './utils';

export const Body = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Body({ style, ...props }, propRef) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { styles: transitionStyles } = useTransitionStyles(floatingContext, bodyTransitionStyles);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floatingContext}
        modal={context.modal}
      >
        <div
          ref={ref}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            ...transitionStyles,
            ...style,
          }}
          {...context.getFloatingProps(props)}
        >
          {props.children}
          <FloatingArrow
            ref={context.arrowRef}
            context={floatingContext}
            strokeWidth={1}
            tipRadius={1}
            className="fill-snow [&>path:first-of-type]:stroke-orange-100 [&>path:last-of-type]:stroke-snow"
          />
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
