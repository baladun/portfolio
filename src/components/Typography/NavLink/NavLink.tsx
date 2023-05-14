import { NavLinkProps } from './types';
import classnames from 'classnames';
import { getSizeCssClass } from '../Text';
import { Base } from '../Base';
import Link from 'next/link';

export function NavLink(props: NavLinkProps) {
  const { href, as, replace, scroll, shallow, passHref, prefetch, locale, onMouseEnter, onTouchStart, onClick, ...withoutNextLink } = props;
  const nextLinkProps = { href, as, replace, scroll, shallow, passHref, prefetch, locale, onMouseEnter, onTouchStart, onClick };
  const { size = 'base', hoverUnderline, className, children, ...rest } = withoutNextLink;

  const classNames = classnames(
    getSizeCssClass(size), //
    hoverUnderline ? 'underline-custom-animated' : '',
    'cursor-pointer',
    className,
  );

  return (
    <Link
      {...nextLinkProps}
      legacyBehavior
    >
      <Base
        {...rest}
        as="a"
        className={classNames}
      >
        {children}
      </Base>
    </Link>
  );
}
