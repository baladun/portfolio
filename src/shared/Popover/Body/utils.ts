import { UseTransitionStylesProps } from '@floating-ui/react';
import { tailwindConfig } from '@/configs';

const { transitionDuration, transitionTimingFunction } = tailwindConfig;

export const bodyTransitionStyles: UseTransitionStylesProps = {
  duration: transitionDuration,
  initial: ({ side }) => ({
    opacity: 0,
    transitionTimingFunction,
    transform: {
      top: 'translateY(-0.5rem)',
      right: 'translateX(0.5rem)',
      bottom: 'translateY(0.5rem)',
      left: 'translateX(-0.5rem)',
    }[side],
  }),
};
