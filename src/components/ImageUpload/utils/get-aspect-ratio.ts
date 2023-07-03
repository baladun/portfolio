import { AspectRatios, ImageUploadProps } from '../types';

export function getAspectRatio(image: HTMLImageElement, shape: ImageUploadProps['shape']): AspectRatios {
  if (shape === 'square') {
    return AspectRatios.SQUARE;
  }

  const width = image.naturalWidth;
  const height = image.naturalHeight;

  return width > height ? AspectRatios.ALBUM : AspectRatios.PORTRAIT;
}
