import { HeadingProps } from './types';
import { Base } from '../Base';
import { ElementType } from 'react';
import classnames from 'classnames';
import { getSizeCssClass } from './utils';

export function Heading({
  level = 1, //
  className,
  children,
  ...rest
}: HeadingProps) {
  const tagName = `h${level}` as ElementType;
  const classNames = classnames(
    getSizeCssClass(level), //
    className,
  );

  return (
    <Base
      {...rest}
      as={tagName}
      className={classNames}
    >
      {children}
    </Base>
  );
}
