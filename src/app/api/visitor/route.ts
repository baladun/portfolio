import { NextRequest } from 'next/server';
import { toVisitorDto, VisitorUpsertDto } from '@/api-client';
import { commonErrorRes, incorrectPayloadErrorRes, okRes } from '@/app/api/responses';
import { upsertVisitorDtoValidationSchema } from '@/api-client/utils';
import { db } from '@/db';

export async function POST(req: NextRequest) {
  let body: VisitorUpsertDto;
  try {
    body = await upsertVisitorDtoValidationSchema.validate(await req.json());
  } catch (e) {
    return incorrectPayloadErrorRes();
  }

  const { id, timezone, platform, vendor } = body;

  try {
    const visitor = await db.visitor.upsert({
      where: {
        id,
      },
      update: {
        count: {
          increment: 1,
        },
        updatedAt: new Date(),
      },
      create: {
        id,
        timezone,
        platform,
        vendor,
      },
    });

    return okRes(toVisitorDto(visitor));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
