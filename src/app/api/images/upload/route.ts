import { NextRequest, NextResponse } from 'next/server';
import { bucket } from '@/bucket';
import { nanoid } from 'nanoid';
import { getPlaiceholder } from 'plaiceholder';
import { db } from '@/db';
import { Exception } from '@/api';
import { exceptionMsg } from '../../exception-msg';

export async function POST(req: NextRequest) {
  const arrayBuffer = await req.arrayBuffer();

  if (!arrayBuffer.byteLength) {
    return NextResponse.json(exceptionMsg.NO_PAYLOAD, { status: 400 });
  }

  const buffer = Buffer.from(arrayBuffer);

  try {
    const {
      base64,
      metadata: { width, height, format },
    } = await getPlaiceholder(buffer);
    const mime = `image/${format}`;
    const id = nanoid();
    const blobStream = bucket.file(id).createWriteStream({ contentType: mime });

    await new Promise(resolve => {
      blobStream.on('finish', () => resolve(null));
      blobStream.end(buffer);
    });

    const image = await db.image.create({
      data: {
        id,
        mime,
        width,
        height,
        blurDataUrl: base64,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(new Exception(err.message || exceptionMsg.NOT_EXECUTE), { status: 400 });
  }
}
