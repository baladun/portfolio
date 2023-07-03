import { forwardRef, HTMLProps, useLayoutEffect } from 'react';
import { useDialogFrameContext } from '../hooks';
import { useId } from '@floating-ui/react';

export const Content = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Content({ children, ...props }, ref) {
  const { setDescriptionId } = useDialogFrameContext();
  const id = useId();

  // Only sets `aria-describedby` on the Dialog root element
  // if this component is mounted inside it.
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
