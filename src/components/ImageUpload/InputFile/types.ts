import { ImageUploadProps } from '../types';
import { HTMLAttributes } from 'react';

export type InputFileProps = HTMLAttributes<HTMLElement> &
  Required<Pick<ImageUploadProps, 'multiple'>> & {
    onAdd: (files: File[]) => void;
    isProcessing?: boolean;
    descriptive?: boolean;
  };
