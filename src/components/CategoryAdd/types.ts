import { DialogProps } from '@/shared/Dialog';

export interface CategoryAddDialogProps extends Required<Pick<DialogProps, 'open' | 'onOk' | 'onCancel'>> {}
