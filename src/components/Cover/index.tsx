import 'server-only';
import { CoverProps } from './types';
import classnames from 'classnames';
import Image from 'next/image';
import { Frame } from '@/components/Frame';
import { getPublicObjectUrl } from '@/utils';
import { IconPark } from '@/shared/IconPark';

export function Cover({ image, subtitle, className, ...rest }: CoverProps) {
  return (
    <div
      {...rest}
      className={classnames('max-w-max', className)}
    >
      <Frame className="mb-4 lg:mb-6">
        {image ? (
          <Image
            src={getPublicObjectUrl(image.id)}
            width={image.width}
            height={image.height}
            blurDataURL={image.blurDataUrl}
            placeholder="blur"
            alt="image"
            className="aspect-square cursor-pointer object-cover"
          />
        ) : (
          <IconPark
            type="Picture"
            className="text-[25rem] text-orange"
          />
        )}
      </Frame>

      {subtitle}
    </div>
  );
}
