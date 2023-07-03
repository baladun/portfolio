import { LabelProps } from './types';
import classnames from 'classnames';
import { getSizeCssClass } from './utils';
import { Base } from '../Base';
import { memo } from 'react';

export const Label = memo(function Label({
  size = 'xs', //
  weight = 'medium',
  className,
  children,
  ...rest
}: LabelProps) {
  const classNames = classnames(
    getSizeCssClass(size), //
    'uppercase',
    className,
  );

  return (
    <Base
      {...rest}
      weight={weight}
      as="label"
      className={classNames}
    >
      {children}
    </Base>
  );
});
