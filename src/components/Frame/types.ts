import { HTMLAttributes, PropsWithChildren } from 'react';
import { InternalHref } from '@/types';

export interface FrameProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  as?: 'a' | 'button';
  href?: InternalHref;
}
