import { ImageDto, PathWithId } from '../models';
import { buildUrl, buildError, fetcherRes, authorizeReq } from '../utils';

export async function uploadImage(payload: Blob): Promise<ImageDto> {
  const res = await fetch(
    buildUrl('/images'),
    await authorizeReq({
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    }),
  );

  return fetcherRes(res);
}

export async function getImage(id: PathWithId['id']): Promise<Blob> {
  const res = await fetch(buildUrl(`/images/${id}`), {
    method: 'GET',
  });

  if (res.ok) {
    return res.blob();
  }

  throw buildError(await res.json());
}

export async function deleteImage(id: PathWithId['id']): Promise<ImageDto> {
  const res = await fetch(
    buildUrl(`/images/${id}`),
    await authorizeReq({
      method: 'DELETE',
    }),
  );

  return fetcherRes(res);
}
