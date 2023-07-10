import { CategoryDto } from '@/api';

export interface CategoryEditProps {
  category: CategoryDto;
}

export interface PreloadedCover {
  id: string;
  file: File;
}
