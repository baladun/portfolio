import { Visitor } from '@prisma/client';

export type VisitorUpsertDto = Pick<Visitor, 'id' | 'timezone' | 'platform' | 'vendor'>;
