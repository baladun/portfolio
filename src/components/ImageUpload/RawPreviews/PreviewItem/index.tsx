import { IconPark } from '@/shared/IconPark';
import Image from 'next/image';
import classnames from 'classnames';
import { PreviewItemProps } from './types';
import { Button } from '@/shared/Button';

export function PreviewItem({
  attachment: {
    raw: { dataUrl, name, image },
  },
  showDelete = true,
  onDelete,
  className,
  ...rest
}: PreviewItemProps) {
  return (
    <div
      {...rest}
      className={classnames('relative inline-block h-28 w-28 overflow-hidden rounded-lg border-2', className)}
    >
      {showDelete && (
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

      <Image
        src={dataUrl}
        alt={name}
        width={image.naturalWidth}
        height={image.naturalHeight}
        className={classnames('pointer-events-none aspect-square select-none object-cover')}
      />
    </div>
  );
}
