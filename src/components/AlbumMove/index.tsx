'use client';

import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { AlbumMoveProps } from './types';
import { BottomSheet } from '@/shared/BottomSheet';
import { useEffect, useState } from 'react';
import { PreviewItem, Previews } from '@/components/Previews';
import { mapToPreviews } from './utils';
import { fetchTags, revalidateCache, UpdateAlbumDto, updateAlbums } from '@/api';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { useRouter } from 'next/navigation';

export function AlbumMove({ albums, ...rest }: AlbumMoveProps) {
  const router = useRouter();
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviews(mapToPreviews(albums));
  }, [albums]);

  const onOk = async () => {
    const reordered: UpdateAlbumDto[] = [];

    previews.forEach(({ id: previewId }, order) => {
      const album = albums.find(alb => alb.id === Number(previewId) && alb.categoryOrder !== order);
      if (album) {
        const { id } = album;
        reordered.push({ id, categoryOrder: order });
      }
    });

    if (reordered.length) {
      setLoading(true);

      try {
        await updateAlbums(reordered);
        await revalidateCache({ tags: [fetchTags.GET_ALBUMS] });
        router.refresh();
        toast.success(toastMsg.SUCCESS);
        setOpen(false);
      } catch (e) {
        toast.error(toastMsg.WENT_WRONG);
      } finally {
        setLoading(false);
      }
    } else {
      setOpen(false);
    }
  };

  const onCancel = () => {
    setPreviews(mapToPreviews(albums));
    setOpen(false);
  };

  return (
    <>
      {!!albums.length && (
        <>
          <Button
            {...rest}
            kind="bordered"
            size="sm"
            icon={<IconPark type="Move" />}
            onClick={() => setOpen(!open)}
          />

          <BottomSheet
            open={open}
            fullWidth
            loading={loading}
            onOk={onOk}
            onCancel={onCancel}
          >
            <Previews
              items={previews}
              onReorder={setPreviews}
            />
          </BottomSheet>
        </>
      )}
    </>
  );
}
