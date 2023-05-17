import { TextProps } from '@/shared/Typography/Text';
import { HTMLAttributes } from 'react';

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  color?: TextProps['color'];
  dir?: 'horizontal' | 'vertical';
}
