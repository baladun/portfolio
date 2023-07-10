import { PercentCrop } from 'react-image-crop';
import { HTMLAttributes } from 'react';

export interface ImageUploadProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  shape?: 'square' | 'rectangle';
  preloaded?: File | File[];
  onUpdate?: (value?: Blob[] | null) => void;
}

export enum AspectRatios {
  SQUARE = 1,
  ALBUM = 3 / 2,
  PORTRAIT = 2 / 3,
}

export interface Attachment {
  id: string;
  raw: {
    dataUrl: string;
    mime: string;
    name: string;
    image: HTMLImageElement;
  };
  modification: {
    crop: PercentCrop;
    rotation: number;
    aspect: AspectRatios;
    minWidth: number;
    minHeight: number;
  };
  result: {
    blob: Blob;
    width: number;
    height: number;
  };
}

export type CropperChange = Partial<Pick<Attachment['modification'], 'crop' | 'rotation'>>;
