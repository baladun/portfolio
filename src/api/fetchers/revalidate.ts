import { RevalidateDto } from '../models';
import { buildUrl } from '../build-url';
import { buildError } from '../build-error';

export async function revalidateCache(body: RevalidateDto): Promise<unknown> {
  const res = await fetch(buildUrl(`/revalidate`), {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}
