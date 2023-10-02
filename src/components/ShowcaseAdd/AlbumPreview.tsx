import { AlbumPreviewProps } from './types';
import Image from 'next/image';
import { getPublicObjectUrl } from '@/utils';
import { ImagePlaceholder } from '@/shared/ImagePlaceholder';
import classnames from 'classnames';

const selectedCssClassNames = 'outline outline-4 -outline-offset-4 outline-orange';

export function AlbumPreview({ image, subtitle, selected, className, ...rest }: AlbumPreviewProps) {
  return (
    <div
      {...rest}
      className={classnames('relative', className)}
    >
      {image ? (
        <Image
          src={getPublicObjectUrl(image.id)}
          width={image.width}
          height={image.height}
          blurDataURL={image.blurDataUrl}
          placeholder="blur"
          alt="image"
          className={classnames('aspect-square rounded-lg object-cover', selected ? selectedCssClassNames : '')}
        />
      ) : (
        <ImagePlaceholder className={classnames('rounded-lg', selected ? selectedCssClassNames : '')} />
      )}

      {subtitle}
    </div>
  );
}
