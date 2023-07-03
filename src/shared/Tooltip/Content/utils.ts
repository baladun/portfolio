import { UseTransitionStylesProps } from '@floating-ui/react';
import { tailwindConfig } from '@/configs';

const { transitionDuration, transitionTimingFunction } = tailwindConfig;

export const tooltipTransitionStyles: UseTransitionStylesProps = {
  duration: transitionDuration,
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  open: {
    transitionTimingFunction,
    scale: 1,
    opacity: 1,
  },
};
