import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export interface ButtonProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  type?: 'filled' | 'bordered' | 'text';
  color?: 'black' | 'orange' | 'brown';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}
