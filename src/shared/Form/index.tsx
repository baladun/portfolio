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

export { Control } from './Control';
export { InputText } from './InputText';
export { TextArea } from './TextArea';
export { Select, type SelectOption } from './Select';
export { Checkbox } from './Checkbox';
