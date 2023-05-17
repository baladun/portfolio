'use client';

import { ButtonProps } from './types';
import classnames from 'classnames';
import { getAppearance, getDimensions, getDisabled, getFocus } from './utils';
import { Children } from 'react';

export function Button({
  kind = 'filled', //
  color = 'orange',
  size = 'md',
  icon,
  iconPosition = 'start',
  disabled,
  loading,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconOnly = !!icon && Children.count(children) === 0;
  const contentOnly = !icon && !!Children.count(children);
  const iconAndContent = icon && !!Children.count(children);

  const classNames = classnames(
    'rounded-[0.5em]', //
    'font-normal',
    getDimensions(size, kind, iconOnly),
    getAppearance(kind, color),
    getFocus(color),
    disabled ? getDisabled() : '',
    className,
  );

  return (
    <button
      {...rest}
      className={classNames}
    >
      {icon && iconPosition === 'start' && <span className={iconAndContent ? 'pr-[0.5em]' : ''}>{icon}</span>}

      {(contentOnly || iconAndContent) && <span>{children}</span>}

      {icon && iconPosition === 'end' && <span className={iconAndContent ? 'pl-[0.5em]' : ''}>{icon}</span>}
    </button>
  );
}
