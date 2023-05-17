import { PropsWithChildren, ReactNode } from 'react';

export interface NoSsrProps extends PropsWithChildren {
  fallback?: ReactNode;
}
