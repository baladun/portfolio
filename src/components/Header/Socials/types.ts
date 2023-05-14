import { TextProps } from '@/components/Typography/Text';
import { HTMLAttributes } from 'react';

export interface SocialsProps extends HTMLAttributes<HTMLElement> {
  color?: TextProps['color'];
}
