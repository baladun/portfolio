import { BaseProps } from './types';
import classnames from 'classnames';
import { getAlignCssClass, getColorCssClass, getFamilyCssClass, getWeightCssClass } from './utils';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
export const Base = forwardRef<unknown, BaseProps>(
  (
    {
      as: Component = 'span', //
      kind,
      weight,
      color,
      uppercase,
      align,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = classnames(
      getFamilyCssClass(kind), //
      getWeightCssClass(weight),
      getColorCssClass(color),
      uppercase ? 'uppercase' : '',
      getAlignCssClass(align),
      className,
    );

    return (
      <Component
        {...rest}
        ref={ref}
        className={classNames}
      >
        {children}
      </Component>
    );
  },
);
