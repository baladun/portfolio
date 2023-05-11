import { BaseProps } from './types';
import classnames from 'classnames';
import { getColorCssClass, getFamilyCssClass, getWeightCssClass } from './utils';

export function Base({
  as: Component = 'span', //
  kind,
  weight,
  color,
  uppercase,
  className,
  children,
  ...rest
}: BaseProps) {
  const classNames = classnames(
    getFamilyCssClass(kind), //
    getWeightCssClass(weight),
    getColorCssClass(color),
    uppercase ? 'uppercase' : '',
    className,
  );

  return (
    <Component
      {...rest}
      className={classNames}
    >
      {children}
    </Component>
  );
}
