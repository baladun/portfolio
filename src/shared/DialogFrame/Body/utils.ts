import { UseTransitionStylesProps } from '@floating-ui/react';
import { tailwindConfig } from '@/configs';

const { transitionDuration, transitionTimingFunction } = tailwindConfig;

export const overlayTransitionStyles: UseTransitionStylesProps = {
  duration: transitionDuration,
  open: {
    transitionTimingFunction,
    backdropFilter: 'blur(24px)',
  },
};

export const bodyTransitionStyles: UseTransitionStylesProps = {
  duration: transitionDuration,
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  open: {
    transitionTimingFunction,
    opacity: 1,
    scale: 1,
  },
};
