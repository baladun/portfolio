import { TypographyProps, TypographySelfConfig } from '../types';
import { LinkProps } from 'next/link';
import { TextProps } from '../Text';
import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type NavLinkCommon = PropsWithChildren<TypographySelfConfig> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    size?: TextProps['size'];
    hoverUnderline?: boolean;
  };

export type NavLinkProps = Omit<LinkProps<unknown>, 'legacyBehavior'> & NavLinkCommon;
export type NavLinkExternalProps = NavLinkCommon & {
  href: string;
};
