import { memo } from 'react';
import Image from 'next/image';
import { ImagePlaceholderProps } from './types';
import classnames from 'classnames';

export const ImagePlaceholder = memo(function ImagePlaceholder({ className, style }: ImagePlaceholderProps) {
  return (
    <Image
      src="/images/pic.svg"
      width={1024}
      height={1024}
      alt="image-placeholder"
      className={classnames('pointer-events-none aspect-square select-none object-cover', className)}
      style={style}
    />
  );
});
