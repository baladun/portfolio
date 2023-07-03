import { centerCrop, Crop, makeAspectCrop, PercentCrop } from 'react-image-crop';
import { AspectRatios } from '../types';

export function getInitialCrop(image: HTMLImageElement, aspect: AspectRatios): PercentCrop {
  const mediaWidth = image.naturalWidth;
  const mediaHeight = image.naturalHeight;
  const heightOrWidth: Partial<Pick<Crop, 'width' | 'height'>> = aspect === AspectRatios.PORTRAIT ? { height: 100 } : { width: 100 };

  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        ...heightOrWidth,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
