import { NavLinkExternalProps } from './types';
import classnames from 'classnames';
import { getSizeCssClass } from '../Text';
import { Base } from '../Base';

export function NavLinkExternal({ size = 'base', hoverUnderline, className, children, ...rest }: NavLinkExternalProps) {
  const classNames = classnames(
    getSizeCssClass(size), //
    hoverUnderline ? 'underline-custom-animated' : '',
    className,
  );

  return (
    <Base
      {...rest}
      as="a"
      className={classNames}
    >
      {children}
    </Base>
  );
}
