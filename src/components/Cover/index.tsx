import 'server-only';
import { CoverProps } from './types';
import classnames from 'classnames';
import Image from 'next/image';
import { Frame } from '@/components/Frame';
import { getPublicObjectUrl } from '@/utils';
import { ImagePlaceholder } from '@/shared/ImagePlaceholder';

export function Cover({ image, subtitle, href, actions, className, imageCssClass, ...rest }: CoverProps) {
  return (
    <div
      {...rest}
      className={classnames('max-w-max', className)}
    >
      <Frame
        href={href}
        className={classnames(subtitle ? 'mb-4 lg:mb-6' : '')}
      >
        {actions && <div className="absolute right-0 top-0 [&:not(:empty)]:p-3 [&>*:not(:last-child)]:mr-2">{actions}</div>}

        {image ? (
          <Image
            src={getPublicObjectUrl(image.id)}
            width={600}
            height={600}
            blurDataURL={image.blurDataUrl}
            placeholder="blur"
            alt="image"
            className={classnames('aspect-square cursor-pointer object-cover', imageCssClass)}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </Frame>

      {subtitle}
    </div>
  );
}
