import { CategoryCreateDto, CategoryDto, CategoryQueryParams, CategoryUpdateDto, PathWithId } from '../models';
import { authorizeReq, buildUrl, fetcherRes, fetchTags } from '../utils';

export async function getCategories(query?: CategoryQueryParams): Promise<CategoryDto[]> {
  // const res = await fetch(buildUrl('/api/categories'), { cache: 'no-store' });
  const qs = query ? `?${new URLSearchParams(Object.entries(query)).toString()}` : '';
  const res = await fetch(buildUrl(`/categories${qs}`), { next: { tags: [fetchTags.GET_CATEGORIES] } });

  return fetcherRes(res);
}

export async function getCategory(id: PathWithId['id']): Promise<CategoryDto> {
  const res = await fetch(buildUrl(`/categories/${id}`), { next: { tags: [fetchTags.GET_CATEGORY] } });

  return fetcherRes(res);
}

export async function createCategory(payload: CategoryCreateDto): Promise<CategoryDto> {
  const res = await fetch(
    buildUrl('/categories'),
    await authorizeReq({
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  );

  return fetcherRes(res);
}

export async function updateCategories(payload: CategoryUpdateDto[]): Promise<CategoryDto[]> {
  const res = await fetch(
    buildUrl('/categories'),
    await authorizeReq({
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  );

  return fetcherRes(res);
}

export async function deleteCategory(id: PathWithId['id']): Promise<CategoryDto> {
  const res = await fetch(
    buildUrl(`/categories/${id}`),
    await authorizeReq({
      method: 'DELETE',
    }),
  );

  return fetcherRes(res);
}
