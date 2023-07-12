import { DialogProps } from '@/shared/Dialog';

export interface PhotoAddProps {
  albumId: number;
}
export interface PhtotoAddDialogProps extends Required<Pick<DialogProps, 'open' | 'onOk' | 'onCancel'>>, PhotoAddProps {}
