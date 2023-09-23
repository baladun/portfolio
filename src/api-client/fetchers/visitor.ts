import { VisitorDto, VisitorUpsertDto } from '@/api-client';
import { buildUrl, fetcherRes } from '@/api-client/utils';

export async function upsertVisitor(payload: VisitorUpsertDto): Promise<VisitorDto> {
  const res = await fetch(buildUrl('/visitor'), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetcherRes(res);
}
