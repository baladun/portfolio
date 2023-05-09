import { TypographyProps } from '../types';

export interface TextProps extends TypographyProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  hoverUnderline?: boolean;
}
