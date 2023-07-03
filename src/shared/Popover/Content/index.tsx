import { forwardRef, HTMLProps, useLayoutEffect } from 'react';
import { usePopoverContext } from '../hooks';
import { useId } from '@floating-ui/react';

export const Content = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Content({ children, ...props }, ref) {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <div
      {...props}
      ref={ref}
      id={id}
    >
      {children}
    </div>
  );
});
