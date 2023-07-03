import { memo } from 'react';
import { ControlErrorProps } from './types';
import classnames from 'classnames';

export const ControlError = memo(function ControlError({ className, children, ...rest }: ControlErrorProps) {
  return (
    <div
      {...rest}
      className={classnames('text-[0.813rem] text-red', className)}
    >
      {children}
    </div>
  );
});
