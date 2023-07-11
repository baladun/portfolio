export interface CreateAlbumDto {
  name: string;
  categoryId: number;
  coverImageId?: string;
  description?: string;
}
