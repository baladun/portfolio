import { TypographyProps } from '../types';
import { ElementType } from 'react';

export interface BaseProps extends TypographyProps {
  as?: ElementType;
}
