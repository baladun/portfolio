import { TextProps } from '@/components/Typography/Text';
import { HTMLAttributes } from 'react';

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  color?: TextProps['color'];
  dir?: 'horizontal' | 'vertical';
}
