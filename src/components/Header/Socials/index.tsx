import 'server-only';
import { Typography } from '@/components/Typography';
import { SocialsProps } from './types';
import { socialsConfig } from './utils';

const { NavLinkExternal } = Typography;

export function Socials({ color, className, ...rest }: SocialsProps) {
  return (
    <div
      {...rest}
      className={`flex items-center justify-between gap-6 ${className}`}
    >
      {socialsConfig.map((conf, idx) => (
        <NavLinkExternal
          key={idx}
          href={conf.path}
          kind="secondary"
          color={color}
          hoverUnderline
          target="_blank"
        >
          {conf.text}
        </NavLinkExternal>
      ))}
    </div>
  );
}
