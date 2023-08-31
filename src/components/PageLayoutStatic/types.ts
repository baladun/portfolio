import { PropsWithChildren, ReactElement } from 'react';
import { InternalPath } from '@/types';

export interface PageLayoutStaticProps extends PropsWithChildren {
  heading?: ReactElement;
  backHref?: InternalPath;
  className?: string;
}
