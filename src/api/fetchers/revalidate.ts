import { RevalidateDto } from '../models';
import { buildUrl } from '../build-url';

export async function revalidateCache(body: RevalidateDto): Promise<unknown> {
  return await fetch(buildUrl(`/revalidate`), {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
