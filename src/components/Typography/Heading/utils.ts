import { HeadingProps } from './types';

const sizeByLevel = {
  1: 'text-8xl',
  2: 'text-6xl',
  3: 'text-5xl',
  4: 'text-3xl',
  5: 'text-2xl',
};

export const getSizeCssClass = (level: Required<HeadingProps>['level']): string => {
  return sizeByLevel[level];
};
