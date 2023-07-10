import 'server-only';
import { CoverProps } from './types';
import classnames from 'classnames';
import Image from 'next/image';
import { Frame } from '@/components/Frame';
import { getPublicObjectUrl } from '@/utils';
import { IconPark } from '@/shared/IconPark';
import { ImagePlaceholder } from '@/shared/ImagePlaceholder';

export function Cover({ image, subtitle, actions, className, ...rest }: CoverProps) {
  return (
    <div
      {...rest}
      className={classnames('max-w-max', className)}
    >
      <Frame className="mb-4 lg:mb-6">
        {actions && <div className="absolute right-0 top-0 [&:not(:empty)]:p-3 [&>*:not(:last-child)]:mr-2">{actions}</div>}

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
          <ImagePlaceholder />
        )}
      </Frame>

      {subtitle}
    </div>
  );
}
