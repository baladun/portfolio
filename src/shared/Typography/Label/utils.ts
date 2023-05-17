import { LabelProps } from './types';

const textSizeBySize = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
};

export const getSizeCssClass = (size: Required<LabelProps>['size']): string => {
  return textSizeBySize[size];
};
