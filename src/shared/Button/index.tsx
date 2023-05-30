'use client';

import styles from './styles.module.scss';
import { ButtonProps } from './types';
import classnames from 'classnames';
import { getAppearance, getDimensions, getDisabled, getFocus } from './utils';
import { Children, forwardRef, memo } from 'react';

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
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
      },
      ref,
    ) => {
      const iconOnly = !!icon && Children.count(children) === 0;
      const contentOnly = !icon && !!Children.count(children);
      const iconAndContent = icon && !!Children.count(children);

      const classNames = classnames(
        'rounded-[0.5em]', //
        'font-medium',
        getDimensions(size, kind, iconOnly),
        getAppearance(kind, color),
        getFocus(color),
        disabled ? getDisabled() : '',
        className,
      );

      const iconClassNames = classnames(
        styles.icon, //
        iconPosition === 'start' && iconAndContent ? 'pr-[0.5em]' : '',
        iconPosition === 'end' && iconAndContent ? 'pl-[0.5em]' : '',
      );

      return (
        <button
          ref={ref}
          {...rest}
          className={classNames}
        >
          {icon && iconPosition === 'start' && <span className={iconClassNames}>{icon}</span>}

          {(contentOnly || iconAndContent) && <span>{children}</span>}

          {icon && iconPosition === 'end' && <span className={iconClassNames}>{icon}</span>}
        </button>
      );
    },
  ),
);
