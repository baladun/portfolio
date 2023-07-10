import { forwardRef, HTMLProps, useEffect, useState } from 'react';
import { useDialogFrameContext } from '../hooks';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
  useTransitionStatus,
  useTransitionStyles,
} from '@floating-ui/react';
import { bodyTransitionStyles, overlayTransitionStyles } from './utils';

export const Body = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Body(props, propRef) {
  const [resetStyles, setResetStyles] = useState(false);
  const { context: floatingContext, ...context } = useDialogFrameContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { styles: overlayStyles } = useTransitionStyles(floatingContext, overlayTransitionStyles);
  const { styles: bodyStyles } = useTransitionStyles(floatingContext, bodyTransitionStyles);
  const { status } = useTransitionStatus(floatingContext);

  // hack to reset transition styles to not create excess CSS layer context
  useEffect(() => {
    if (status === 'open') {
      setTimeout(() => setResetStyles(true), 1000);
    } else if (status === 'close') {
      setResetStyles(false);
    }
  }, [status]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay
        className="grid items-end justify-items-center bg-black/30 p-1"
        style={overlayStyles}
        lockScroll
      >
        <FloatingFocusManager
          context={floatingContext}
          initialFocus={status === 'initial' ? -1 : 0}
        >
          <div
            ref={ref}
            aria-labelledby={context.labelId}
            {...context.getFloatingProps(props)}
            style={{
              ...(!resetStyles ? bodyStyles : {}),
              ...props.style,
            }}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});
