import { DialogFrameProps } from '@/shared/DialogFrame';

export type DialogProps = Pick<DialogFrameProps, 'children' | 'className' | 'style'> & {
  open: boolean;
  headingText?: string;
  showOk?: boolean;
  okText?: string;
  showCancel?: boolean;
  cancelText?: string;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
};
