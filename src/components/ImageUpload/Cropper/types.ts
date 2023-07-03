import { Attachment, CropperChange } from '../types';

export interface CropperProps {
  attachment: Attachment;
  onChange: (data: CropperChange) => void;
}

export type CropperMode = 'edit' | 'view';
