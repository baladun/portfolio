import { ImageDto } from '../models';
import { buildUrl } from '../build-url';

export async function uploadImage(payload: Blob): Promise<ImageDto> {
  const res = await fetch(buildUrl('/images/upload'), {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });

  return res.json();
}
