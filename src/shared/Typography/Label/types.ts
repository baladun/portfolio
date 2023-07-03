import { TypographyProps } from '../types';
import { LabelHTMLAttributes } from 'react';

export interface LabelProps extends TypographyProps<LabelHTMLAttributes<HTMLLabelElement>> {
  size?: 'xs' | 'sm' | 'base';
}
