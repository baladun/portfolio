import { TextProps } from './types';
import classnames from 'classnames';
import { getSizeCssClass } from './utils';
import { Base } from '../Base';

export function Text({
  size = 'base', //
  hoverUnderline,
  className,
  children,
  ...rest
}: TextProps) {
  const classNames = classnames(
    getSizeCssClass(size), //
    hoverUnderline && 'hover:underline underline-offset-4',
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
}
