import { AlbumDto, AlbumQueryParams, CreateAlbumDto, fetchTags, PathWithId, UpdateAlbumDto, UpdateAlbumOrderDto } from '@/api';
import { buildUrl, fetcherRes } from '../utils';

export async function getAlbums(query?: AlbumQueryParams): Promise<AlbumDto[]> {
  const qs = query ? `?${new URLSearchParams(Object.entries(query)).toString()}` : '';
  const res = await fetch(buildUrl(`/albums${qs}`), { next: { tags: [fetchTags.GET_ALBUMS] } });

  return fetcherRes(res);
}

export async function getAlbum(id: PathWithId['id']): Promise<AlbumDto> {
  const res = await fetch(buildUrl(`/albums/${id}`), { next: { tags: [fetchTags.GET_ALBUM] } });

  return fetcherRes(res);
}

export async function createAlbum(payload: CreateAlbumDto): Promise<AlbumDto> {
  const res = await fetch(buildUrl('/albums'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateAlbumsOrder(payload: UpdateAlbumOrderDto[]): Promise<AlbumDto[]> {
  const res = await fetch(buildUrl('/albums'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateAlbum(id: PathWithId['id'], payload: UpdateAlbumDto): Promise<AlbumDto> {
  const res = await fetch(buildUrl(`/albums/${id}`), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function deleteAlbum(id: PathWithId['id']): Promise<AlbumDto> {
  const res = await fetch(buildUrl(`/albums/${id}`), {
    method: 'DELETE',
  });

  return fetcherRes(res);
}
