import { AlbumDto, ImageDto } from '@/api-client';
import { DialogProps } from '@/shared/Dialog';
import { HTMLAttributes, ReactElement } from 'react';

export interface ShowcaseAddProps {
  className?: string;
}

export interface ShowcaseAddDialogProps extends Required<Pick<DialogProps, 'open' | 'onOk' | 'onCancel'>> {
  allAlbums: AlbumDto[];
}

export interface AlbumPreviewProps extends HTMLAttributes<HTMLDivElement> {
  subtitle?: ReactElement;
  image?: ImageDto | null;
  selected?: boolean;
}
