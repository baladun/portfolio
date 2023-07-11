import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { ImageDto } from '@/api';
import { InternalHref } from '@/types';

export interface CoverProps extends HTMLAttributes<HTMLDivElement> {
  subtitle: ReactElement;
  image?: ImageDto | null;
  href?: InternalHref;
  actions?: ReactNode;
}
