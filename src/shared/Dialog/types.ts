import { DialogHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

interface CommonProps extends PropsWithChildren, DialogHTMLAttributes<HTMLDialogElement> {}

export interface DialogFrameProps extends CommonProps {
  header?: ReactElement;
  footer?: ReactElement;
}

export interface DialogProps extends Omit<CommonProps, 'onCancel'> {
  isShown: boolean;
  headingText?: string;
  showOk?: boolean;
  okText?: string;
  showCancel?: boolean;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export interface DialogFrameRef {
  open: () => void;
  close: () => void;
}
