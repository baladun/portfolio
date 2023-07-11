import { DialogProps } from '@/shared/Dialog';

export interface AlbumAddProps {
  categoryId: number;
}
export interface AlbumAddDialogProps extends Required<Pick<DialogProps, 'open' | 'onOk' | 'onCancel'>>, AlbumAddProps {}
