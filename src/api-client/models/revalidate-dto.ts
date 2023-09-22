import { InternalPath } from '@/types';
import { fetchTags } from '../utils';

export interface RevalidateDto {
  paths?: InternalPath[];
  tags?: (keyof typeof fetchTags)[];
}
