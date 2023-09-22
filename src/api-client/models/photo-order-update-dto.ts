import { Photo } from '@prisma/client';

export type PhotoOrderUpdateDto = Pick<Photo, 'id' | 'order'>;
