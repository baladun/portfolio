import { Visitor } from '@prisma/client';
import { VisitorDto } from '../models';

export function toVisitorDto(model: Visitor): VisitorDto {
  const { createdAt, updatedAt, ...rest } = model;

  return {
    ...rest,
    createdAt: createdAt as unknown as string,
    updatedAt: updatedAt as unknown as string,
  };
}
