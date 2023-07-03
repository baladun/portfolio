import { memo } from 'react';
import { ControlProps } from './types';
import classnames from 'classnames';
import { ControlLabel } from '../ControlLabel';
import { ControlError } from '../ControlError';

const errorBorderCss = '[&_input]:border-red [&_select]:border-red [&_textarea]:border-red';

export const Control = memo(function Control({ label, error, reserveErrorSpace = true, className, children, ...rest }: ControlProps) {
  return (
    <div
      {...rest}
      className={classnames('grid grid-cols-1', error ? errorBorderCss : '', className)}
    >
      <ControlLabel>{label}</ControlLabel>

      {children}

      <ControlError className={classnames(reserveErrorSpace ? 'h-6' : '')}>{error?.message}</ControlError>
    </div>
  );
});
