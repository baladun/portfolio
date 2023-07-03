import { forwardRef, HTMLProps, useLayoutEffect } from 'react';
import { usePopoverContext } from '../hooks';
import { useId } from '@floating-ui/react';

export const Header = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Header({ children, ...props }, ref) {
  const { setLabelId } = usePopoverContext();
  const id = useId();

  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

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
