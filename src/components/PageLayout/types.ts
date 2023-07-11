import { PropsWithChildren, ReactElement } from 'react';
import { InternalPath } from '@/types';

export interface PageLayoutProps extends PropsWithChildren {
  heading: ReactElement;
  backHref?: InternalPath;
}
