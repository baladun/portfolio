import { AspectRatios, Attachment } from '../types';
import { cropperAreaHeightREM, cropperAreaWidthREM, mediaBaseSize } from './constants';

type MinSizes = Pick<Attachment['modification'], 'minWidth' | 'minHeight'>;

export function getMinSize(image: HTMLImageElement, aspect: AspectRatios): MinSizes {
  // based on sizes of cropper area
  const maxAreaWidth = parseInt(window.getComputedStyle(document.documentElement).fontSize) * cropperAreaWidthREM;
  const maxAreaHeight = parseInt(window.getComputedStyle(document.documentElement).fontSize) * cropperAreaHeightREM;

  const { naturalWidth, naturalHeight } = image;
  const ratio = naturalWidth > naturalHeight ? naturalWidth / maxAreaWidth : naturalHeight / maxAreaHeight;
  const base = mediaBaseSize / ratio;

  switch (aspect) {
    case AspectRatios.SQUARE: {
      return {
        minWidth: base,
        minHeight: base,
      };
    }

    case AspectRatios.ALBUM: {
      return {
        minWidth: base * AspectRatios.ALBUM,
        minHeight: base,
      };
    }

    case AspectRatios.PORTRAIT: {
      return {
        minWidth: base,
        minHeight: base * AspectRatios.PORTRAIT,
      };
    }
  }
}
