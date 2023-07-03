import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, forwardRef, HTMLProps, isValidElement } from 'react';
import { usePopoverContext } from '../hooks';

export const Trigger = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(function Trigger({ children, ...props }, propRef) {
  const context = usePopoverContext();
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
