'use client';

import { ShowcaseAddProps } from './types';
import { IconPark } from '@/shared/IconPark';
import { Button } from '@/shared/Button';
import { useState } from 'react';
import { AlbumDto, getAlbums } from '@/api';
import { ShowcaseAddDialog } from './ShowcaseAddDialog';
import { useRouter } from 'next/navigation';

export function ShowcaseAdd({ ...rest }: ShowcaseAddProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const [allAlbums, setAllAlbums] = useState<AlbumDto[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onOk = () => {
    router.refresh();
    setDialogOpen(false);
  };

  const onCancel = () => setDialogOpen(false);

  const getAllAlbums = async () => {
    setLoading(true);
    const all = await getAlbums({ sort: 'createdAt,desc' });
    setAllAlbums(all);
    setLoading(false);
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        {...rest}
        size="sm"
        icon={
          loading ? (
            <IconPark
              type="Loading"
              spin
            />
          ) : (
            <IconPark type="Plus" />
          )
        }
        onClick={() => {
          getAllAlbums();
        }}
      />

      <ShowcaseAddDialog
        open={dialogOpen}
        onOk={onOk}
        onCancel={onCancel}
        allAlbums={allAlbums}
      />
    </>
  );
}
