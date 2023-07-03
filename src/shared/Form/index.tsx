import { forwardRef, memo } from 'react';
import { FormProps } from './types';

export const Form = memo(
  forwardRef<HTMLFormElement, FormProps>(({ children, ...rest }, ref) => {
    return (
      <form
        {...rest}
        ref={ref}
      >
        {children}
      </form>
    );
  }),
);
