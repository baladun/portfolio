import { IconPark } from '@/shared/IconPark';
import { Tooltip } from '@/shared/Tooltip';
import { RestrictionsProps } from './types';
import classnames from 'classnames';
import { mediaAllowedExtensions, mediaMinSize } from '../../utils';

export function Restrictions({ className, ...rest }: RestrictionsProps) {
  const content = (
    <ul className="list-inside list-disc">
      <li>
        min: {mediaMinSize}x{mediaMinSize}
      </li>
      <li>format: {mediaAllowedExtensions.join(', ')}</li>
    </ul>
  );

  return (
    <Tooltip content={content}>
      <IconPark
        {...rest}
        type="Info"
        className={classnames('text-2xl text-brown', className)}
      />
    </Tooltip>
  );
}
