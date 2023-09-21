import { InternalPath } from '@/types';
import { fetchTags } from '@/api';

export interface RevalidateDto {
  paths?: InternalPath[];
  tags?: (keyof typeof fetchTags)[];
}
