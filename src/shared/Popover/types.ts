import { Placement } from '@floating-ui/core';
import { ReactNode } from 'react';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type PopoverProps = PopoverOptions & {
  children: ReactNode;
  content: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};
