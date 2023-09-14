import { NextRequest } from 'next/server';
import { bucket } from '@/bucket';
import { nanoid } from 'nanoid';
import { getPlaiceholder } from 'plaiceholder';
import { db } from '@/db';
import { commonErrorRes, createdRes, noPayloadErrorRes, unauthorizedRes } from '../responses';
import { toImageDto } from '@/api';
import { isAuthorized } from '../is-authorized';

export async function POST(req: NextRequest) {
  try {
    await isAuthorized(req);
  } catch (e: any) {
    return unauthorizedRes();
  }

  const arrayBuffer = await req.arrayBuffer();

  if (!arrayBuffer.byteLength) {
    return noPayloadErrorRes();
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

    return createdRes(toImageDto(image));
  } catch (e: any) {
    return commonErrorRes(e);
  }
}
