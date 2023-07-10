import { CSSProperties, ReactNode } from 'react';

export interface BottomSheetOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type BottomSheetProps = BottomSheetOptions & {
  children: ReactNode;
  fullWidth?: boolean;
  headerText?: string;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  showOk?: boolean;
  showCancel?: boolean;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
};
