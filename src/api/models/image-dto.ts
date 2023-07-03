import { Image } from '@prisma/client';

export type ImageDto = Omit<Image, 'createdAt'> & {
  createdAt: string;
};
