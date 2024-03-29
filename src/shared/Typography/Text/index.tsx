import { TextProps } from './types';
import classnames from 'classnames';
import { getSizeCssClass } from './utils';
import { Base } from '../Base';
import { memo } from 'react';

export const Text = memo(function Text({
  size = 'base', //
  className,
  children,
  ...rest
}: TextProps) {
  const classNames = classnames(
    getSizeCssClass(size), //
    className,
  );

  return (
    <Base
      {...rest}
      as="span"
      className={classNames}
    >
      {children}
    </Base>
  );
});

export type { TextProps };
export { getSizeCssClass };
