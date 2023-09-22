import { buildError } from './build-error';

export async function fetcherRes(res: Response) {
  if (res.ok) {
    return res.json();
  }

  throw buildError(await res.json());
}
