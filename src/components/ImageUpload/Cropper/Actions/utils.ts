import { ModeAction, RotationAction } from './types';

export const modeActionsConfig: ModeAction[] = [
  {
    type: 'view',
    text: 'view',
  },
  {
    type: 'edit',
    text: 'edit',
  },
];

const delta = 0.5;
export const rotationActionsConfig: RotationAction[] = [
  {
    delta: delta * -1,
  },
  {
    delta,
    styles: { transform: 'scale(-1, 1)' },
  },
];
