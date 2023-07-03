import { PercentCrop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180;

interface Arguments {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  crop: PercentCrop;
  rotation: number;
  mime: string;
}

export function modifyImage({ image, canvas, crop, rotation, mime }: Arguments): Promise<Blob> {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = 'high';

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // const pixelRatio = window.devicePixelRatio;
  const pixelRatio = 1;

  canvas.width = Math.round(image.naturalWidth * (crop.width / 100) * scaleX * pixelRatio);
  canvas.height = Math.round(image.naturalHeight * (crop.height / 100) * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);

  const cropX = image.naturalWidth * (crop.x / 100) * scaleX;
  const cropY = image.naturalHeight * (crop.y / 100) * scaleY;

  const rotateRads = rotation * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  return new Promise(resolve => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          throw new Error('failed to create blob');
        }

        resolve(blob);
      },
      mime,
      0.9,
    );
  });
}
