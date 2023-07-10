import { CategoryDto, CreateCategoryDto, PathWithId, UpdateCategoryDto } from '../models';
import { buildUrl } from '../build-url';
import { fetchTags } from '../fetch-tags';
import { buildError } from '@/api/build-error';

export async function getCategories(): Promise<CategoryDto[]> {
  // const res = await fetch(buildUrl('/api/categories'), { cache: 'no-store' });
  const res = await fetch(buildUrl('/categories'), { next: { tags: [fetchTags.GET_CATEGORIES] } });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}

export async function createCategory(payload: CreateCategoryDto): Promise<CategoryDto> {
  const res = await fetch(buildUrl('/categories'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}

export async function updateCategories(payload: UpdateCategoryDto[]): Promise<CategoryDto[]> {
  const res = await fetch(buildUrl('/categories'), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}

export async function deleteCategory(id: PathWithId['id']): Promise<CategoryDto> {
  const res = await fetch(buildUrl(`/categories/${id}`), {
    method: 'DELETE',
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}
