import { CSSProperties, ReactNode } from 'react';

export interface DialogFrameOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type DialogFrameProps = DialogFrameOptions & {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onEsc?: () => void;
};
