import { forwardRef, HTMLProps } from 'react';

export const Footer = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function Footer({ children, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
});
