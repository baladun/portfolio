import { Attachment } from '../types';
import { mediaAllowedExtensions, mediaMinSize } from './constants';

interface ProcessedFiles {
  fulfilled: Attachment['raw'][];
  skippedFileNames: string[];
}

export function processFiles(files: File[]) {
  return new Promise<ProcessedFiles>(async resolve => {
    const skippedFileNames: string[] = [];

    const imageFiles: File[] = [];
    files.forEach(file => {
      allowedByExtension(file) ? imageFiles.push(file) : skippedFileNames.push(file.name);
    });

    const promises = imageFiles.map(
      file =>
        new Promise<Attachment['raw']>((rslv, rjct) => {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result!.toString();
            if (dataUrl) {
              const image = new Image();
              image.onload = () => {
                if (allowedBySizes(image)) {
                  rslv({
                    dataUrl,
                    mime: file.type,
                    name: file.name,
                    image,
                  });
                } else {
                  skippedFileNames.push(file.name);
                  rjct();
                }
              };

              image.onerror = () => {
                skippedFileNames.push(file.name);
                rjct();
              };
              image.src = dataUrl;
            } else {
              skippedFileNames.push(file.name);
              rjct();
            }
          };
          reader.readAsDataURL(file);
        }),
    );

    const results = await Promise.allSettled(promises);
    const fulfilled = (results.filter(el => el.status === 'fulfilled') as PromiseFulfilledResult<Attachment['raw']>[]).map(el => el.value);

    resolve({ fulfilled, skippedFileNames });
  });
}

function allowedByExtension(file: File): boolean {
  const [type, ext] = file.type.split('/');
  return type.includes('image') && mediaAllowedExtensions.includes(ext);
}

function allowedBySizes(image: HTMLImageElement): boolean {
  const { naturalWidth: width, naturalHeight: height } = image;
  return width >= mediaMinSize && height >= mediaMinSize;
}
