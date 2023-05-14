import { AnchorHTMLAttributes, HTMLAttributes } from 'react';

export interface LogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size: 'md' | 'lg';
}
