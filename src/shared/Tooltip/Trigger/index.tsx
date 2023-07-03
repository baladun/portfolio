import { useTooltipContext } from '@/shared/Tooltip/hooks';
import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, forwardRef, HTMLProps, isValidElement } from 'react';

export const Trigger = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(function Trigger({ children, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  throw new Error('No element provided to refer tooltip');
});
