import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TypographySelfConfig {
  kind?: 'primary' | 'secondary';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'black' | 'snow' | 'inherit' | 'current';
  uppercase?: boolean;
  align?: 'start' | 'center' | 'end';
}

export type TypographyProps<Attributes = HTMLAttributes<HTMLElement>> = PropsWithChildren<TypographySelfConfig> & Attributes;
