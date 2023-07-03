import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Exception, RevalidateDto } from '@/api';
import { exceptionMsg } from '../exception-msg';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RevalidateDto;

  if (!body) {
    return NextResponse.json(new Exception(exceptionMsg.NO_PAYLOAD), { status: 400 });
  }

  if (body) {
    const { paths, tags } = body;

    if (paths?.length) {
      paths.forEach(path => revalidatePath(path));
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    if (tags?.length) {
      tags.forEach(tag => revalidateTag(tag));
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json(new Exception("'paths' or 'tags' for invalidate are not provided"), { status: 400 });
  }
}
