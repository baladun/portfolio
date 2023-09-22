import { Image } from '@prisma/client';
import { Expand } from '@/types';

export type ImageDto = Expand<
  Omit<Image, 'createdAt'> & {
    createdAt: string;
  }
>;
