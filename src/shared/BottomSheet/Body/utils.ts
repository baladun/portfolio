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
    transitionTimingFunction,
    transform: 'translateY(100%)',
  },
  open: {
    transform: 'translateY(0)',
  },
};
