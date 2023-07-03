import { HTMLAttributes, ReactElement } from 'react';
import { ImageDto } from '@/api';

export interface CoverProps extends HTMLAttributes<HTMLDivElement> {
  subtitle: ReactElement;
  image?: ImageDto | null;
}
