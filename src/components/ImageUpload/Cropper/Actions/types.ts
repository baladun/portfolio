import { CropperMode } from '../types';
import { CSSProperties } from 'react';
import { PercentCrop } from 'react-image-crop';

export interface ActionsProps {
  mode: CropperMode;
  rotation: number;
  width: number;
  height: number;
  onModeChange: (mode: CropperMode) => void;
  onRotationChange: (delta: number) => void;
}

export interface ModeAction {
  type: CropperMode;
  text: string;
}

export interface RotationAction {
  delta: number;
  styles?: CSSProperties;
}
