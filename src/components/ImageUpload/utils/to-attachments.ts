import { Attachment, ImageUploadProps } from '../types';
import { getAspectRatio } from './get-aspect-ratio';
import { getInitialCrop } from './get-initial-crop';
import { getMinSize } from './get-min-size';
import { modifyImage } from './modify-image';
import { calculateCroppedSize } from './calculate-cropped-size';

export async function toAttachments(
  processedData: Attachment['raw'][],
  canvas: HTMLCanvasElement,
  shape: ImageUploadProps['shape'],
): Promise<Attachment[]> {
  const promises = processedData.map<Promise<Attachment>>(async raw => {
    const { image, mime } = raw;

    const rotation = 0;
    const aspect = getAspectRatio(image, shape);
    const crop = getInitialCrop(image, aspect);
    const { minWidth, minHeight } = getMinSize(image, aspect);
    const blob = await modifyImage({ image, canvas, crop, rotation, mime });

    return {
      id: randomInteger(1, 10000),
      raw,
      modification: {
        crop,
        rotation,
        aspect,
        minWidth,
        minHeight,
      },
      result: {
        blob,
        width: calculateCroppedSize(image.naturalWidth, crop.width),
        height: calculateCroppedSize(image.naturalHeight, crop.height),
      },
    };
  });

  const result = await Promise.allSettled(promises);

  return result.filter(el => el.status === 'fulfilled').map(el => (el as PromiseFulfilledResult<Attachment>).value);
}

function randomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
