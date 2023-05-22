import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'filled' | 'bordered' | 'text';
  color?: 'black' | 'orange' | 'brown' | 'snow';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
