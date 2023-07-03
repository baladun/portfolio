import { CategoryDto, CreateCategoryDto } from '../models';
import { buildUrl } from '../build-url';
import { fetchTags } from '../fetch-tags';

export async function getCategories(): Promise<CategoryDto[]> {
  // const res = await fetch(buildUrl('/api/categories'), { cache: 'no-store' });
  const res = await fetch(buildUrl('/categories'), { next: { tags: [fetchTags.GET_CATEGORIES] } });
  return res.json();
}

export async function createCategory(payload: CreateCategoryDto): Promise<CategoryDto> {
  const res = await fetch(buildUrl('/categories'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
}
