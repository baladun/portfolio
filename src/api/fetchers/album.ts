import {
  AlbumCreateDto,
  AlbumDto,
  AlbumQueryParams,
  AlbumUpdateDto,
  AlbumUpdateOrderDto,
  fetchTags,
  PathWithId,
  ShowcaseAddDto,
  ShowcaseUpdateDto,
} from '@/api';
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

export async function createAlbum(payload: AlbumCreateDto): Promise<AlbumDto> {
  const res = await fetch(buildUrl('/albums'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateAlbumsOrder(payload: AlbumUpdateOrderDto[]): Promise<AlbumDto[]> {
  const res = await fetch(buildUrl('/albums'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateAlbum(id: PathWithId['id'], payload: AlbumUpdateDto): Promise<AlbumDto> {
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

export async function getShowcase(): Promise<AlbumDto[]> {
  const res = await fetch(buildUrl(`/albums/showcase`), { next: { tags: [fetchTags.GET_SHOWCASE] } });

  return fetcherRes(res);
}

export async function addToShowcase(payload: ShowcaseAddDto): Promise<AlbumDto> {
  const res = await fetch(buildUrl('/albums/showcase'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateShowcase(payload: ShowcaseUpdateDto[]): Promise<AlbumDto[]> {
  const res = await fetch(buildUrl('/albums/showcase'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}
