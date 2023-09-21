'use client';

import { ShowcaseMoveProps } from './types';
import { IconPark } from '@/shared/IconPark';
import { Button } from '@/shared/Button';
import { BottomSheet } from '@/shared/BottomSheet';
import { PreviewItem, Previews } from '@/components/Previews';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mapToPreviews } from './utils';
import { fetchTags, revalidateCache, ShowcaseUpdateDto, updateShowcase } from '@/api';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';

export function ShowcaseMove({ albums, ...rest }: ShowcaseMoveProps) {
  const router = useRouter();
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviews(mapToPreviews(albums));
  }, [albums]);

  const onOk = async () => {
    const reordered: ShowcaseUpdateDto[] = [];

    previews.forEach(({ id: previewId }, order) => {
      const album = albums.find(alb => alb.id === Number(previewId) && alb.showcaseOrder !== order);
      if (album) {
        const { id } = album;
        reordered.push({ albumId: id, order });
      }
    });

    if (reordered.length) {
      setLoading(true);

      try {
        await updateShowcase(reordered);
        await revalidateCache({ paths: ['/'], tags: [fetchTags.GET_ALBUMS] });
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
  );
}
