import * as IconSvgMap from './icons';
import { IconSvgProps } from './types';

export function IconSvg({ type }: IconSvgProps) {
  const Icon = IconSvgMap[type];

  return (
    <span className="i-icon">
      <Icon
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
      />
    </span>
  );
}
