import { forwardRef, HTMLProps } from 'react';
import { useDialogFrameContext } from '../hooks';
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useMergeRefs, useTransitionStyles } from '@floating-ui/react';
import { bodyTransitionStyles, overlayTransitionStyles } from './utils';

export const Body = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Body(props, propRef) {
  const { context: floatingContext, ...context } = useDialogFrameContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { styles: overlayStyles } = useTransitionStyles(floatingContext, overlayTransitionStyles);
  const { styles: bodyStyles } = useTransitionStyles(floatingContext, bodyTransitionStyles);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay
        className="grid place-items-center bg-black/30"
        style={overlayStyles}
        lockScroll
      >
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
            style={{ ...bodyStyles, ...props.style }}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});
