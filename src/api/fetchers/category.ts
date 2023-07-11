import { CategoryDto, CreateCategoryDto, PathWithId, UpdateCategoryDto } from '../models';
import { buildUrl, fetchTags, fetcherRes } from '../utils';

export async function getCategories(): Promise<CategoryDto[]> {
  // const res = await fetch(buildUrl('/api/categories'), { cache: 'no-store' });
  const res = await fetch(buildUrl('/categories'), { next: { tags: [fetchTags.GET_CATEGORIES] } });

  return fetcherRes(res);
}

export async function getCategory(id: PathWithId['id']): Promise<CategoryDto> {
  const res = await fetch(buildUrl(`/categories/${id}`), { next: { tags: [fetchTags.GET_CATEGORY] } });

  return fetcherRes(res);
}

export async function createCategory(payload: CreateCategoryDto): Promise<CategoryDto> {
  const res = await fetch(buildUrl('/categories'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function updateCategories(payload: UpdateCategoryDto[]): Promise<CategoryDto[]> {
  const res = await fetch(buildUrl('/categories'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}

export async function deleteCategory(id: PathWithId['id']): Promise<CategoryDto> {
  const res = await fetch(buildUrl(`/categories/${id}`), {
    method: 'DELETE',
  });

  return fetcherRes(res);
}
