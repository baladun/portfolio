import { ImageDto, PathWithId } from '../models';
import { buildUrl } from '../build-url';
import { buildError } from '..//build-error';

export async function uploadImage(payload: Blob): Promise<ImageDto> {
  const res = await fetch(buildUrl('/images'), {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
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
  const res = await fetch(buildUrl(`/images/${id}`), {
    method: 'DELETE',
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}
