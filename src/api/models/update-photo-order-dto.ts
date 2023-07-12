import { Photo } from '@prisma/client';

export type UpdatePhotoOrderDto = Pick<Photo, 'id' | 'order'>;
