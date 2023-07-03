import { forwardRef, HTMLProps } from 'react';
import { useTooltipContext } from '../hooks';
import { FloatingPortal, useMergeRefs, useTransitionStyles } from '@floating-ui/react';
import { tooltipTransitionStyles } from './utils';

export const Content = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Content({ ...props }, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { styles: transitionStyles } = useTransitionStyles(context.context, tooltipTransitionStyles);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
        }}
      >
        <div
          {...context.getFloatingProps(props)}
          style={transitionStyles}
          className="max-w-xs rounded-[0.5em] bg-brown px-3 py-2 font-montserrat text-xs font-medium text-snow shadow-xl shadow-brown/20"
        ></div>
      </div>
    </FloatingPortal>
  );
});
