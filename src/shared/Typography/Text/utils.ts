import { TextProps } from './types';

const textSizeBySize = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const getSizeCssClass = (size: Required<TextProps>['size']): string => {
  return textSizeBySize[size];
};
