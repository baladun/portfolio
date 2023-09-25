import { IconPark } from '@/shared/IconPark';
import Image from 'next/image';
import classnames from 'classnames';
import { ItemProps } from './types';
import { Button } from '@/shared/Button';
import { ImagePlaceholder } from '@/shared/ImagePlaceholder';

export function Item({ data: { src, name, width, height }, deletable, onDelete, className, ...rest }: ItemProps) {
  return (
    <div
      {...rest}
      className={classnames('relative inline-block h-28 w-28 overflow-hidden rounded-lg', className)}
    >
      {deletable && (
        <Button
          size="xs"
          icon={<IconPark type="Delete" />}
          className="absolute right-0 top-0 !opacity-50 !transition hover:!opacity-100"
          onClick={e => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      )}

      {src ? (
        <Image
          src={src}
          alt={name}
          width={128}
          height={128}
          className={classnames('pointer-events-none aspect-square select-none object-cover')}
        />
      ) : (
        <ImagePlaceholder />
      )}
    </div>
  );
}
