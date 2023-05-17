import { TextProps } from '@/shared/Typography/Text';
import { HTMLAttributes } from 'react';

export interface SocialsProps extends HTMLAttributes<HTMLElement> {
  color?: TextProps['color'];
}
