import { Visitor } from '@prisma/client';
import { Expand } from '@/types';

export type VisitorDto = Expand<
  Omit<Visitor, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  }
>;
