import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Exception, RevalidateDto } from '@/api';
import { incorrectPayloadErrorRes, okRes } from '../responses';
import { revalidateDtoValidationSchema } from '@/api/utils';

export async function POST(req: NextRequest) {
  let body: RevalidateDto;
  try {
    body = await revalidateDtoValidationSchema.validate(await req.json());
  } catch (e) {
    return incorrectPayloadErrorRes();
  }

  const { paths, tags } = body;

  if (paths?.length) {
    paths.forEach(path => revalidatePath(path));
    return okRes({ revalidated: true, now: Date.now() });
  }

  if (tags?.length) {
    tags.forEach(tag => revalidateTag(tag));
    return okRes({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json(new Exception("'paths' or 'tags' for invalidate are not provided"), { status: 400 });
}
