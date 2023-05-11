import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TypographyProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  kind?: 'primary' | 'secondary';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'black' | 'snow' | 'inherit' | 'current';
  uppercase?: boolean;
}
