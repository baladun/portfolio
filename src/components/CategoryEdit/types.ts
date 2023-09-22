import { CategoryDto } from '@/api-client';

export interface CategoryEditProps {
  category: CategoryDto;
}

export interface PreloadedCover {
  id: string;
  file: File;
}
