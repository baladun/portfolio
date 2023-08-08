import { PhotosCreateDto, PathWithId, PhotoDto, PhotoQueryParams, PhotoOrderUpdateDto } from '../models';
import { buildUrl, fetcherRes, fetchTags } from '../utils';

export async function getPhotos(query?: PhotoQueryParams): Promise<PhotoDto[]> {
  const qs = query ? `?${new URLSearchParams(Object.entries(query)).toString()}` : '';
  const res = await fetch(buildUrl(`/photos${qs}`), { next: { tags: [fetchTags.GET_PHOTOS] } });

  return fetcherRes(res);
}

export async function getPhoto(id: PathWithId['id']): Promise<PhotoDto> {
  const res = await fetch(buildUrl(`/photos/${id}`));

  return fetcherRes(res);
}

export async function createPhotos(payload: PhotosCreateDto): Promise<PhotoDto[]> {
  const res = await fetch(buildUrl('/photos'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updatePhotosOrder(payload: PhotoOrderUpdateDto[]): Promise<PhotoDto[]> {
  const res = await fetch(buildUrl('/photos'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function deletePhoto(id: PathWithId['id']): Promise<PhotoDto> {
  const res = await fetch(buildUrl(`/photos/${id}`), {
    method: 'DELETE',
  });

  return fetcherRes(res);
}
