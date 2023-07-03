import { Placement } from '@floating-ui/core';
import { ReactElement, ReactNode } from 'react';

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type TooltipProps = TooltipOptions & {
  content: string | ReactElement;
  children: ReactNode;
};
