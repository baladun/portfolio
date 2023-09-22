export interface AlbumCreateDto {
  name: string;
  categoryId: number;
  coverImageId?: string;
  description?: string;
}
