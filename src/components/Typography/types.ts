import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TypographySelfConfig {
  kind?: 'primary' | 'secondary';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'black' | 'snow' | 'inherit' | 'current';
  uppercase?: boolean;
}

export type TypographyProps = PropsWithChildren<TypographySelfConfig> & HTMLAttributes<HTMLElement>;
