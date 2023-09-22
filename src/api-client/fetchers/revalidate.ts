import { RevalidateDto } from '../models';
import { buildUrl, fetcherRes } from '../utils';

export async function revalidateCache(body: RevalidateDto): Promise<unknown> {
  const res = await fetch(buildUrl(`/revalidate`), {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return fetcherRes(res);
}
