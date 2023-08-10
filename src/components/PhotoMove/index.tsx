'use client';

import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { PhotoMoveProps } from './types';
import { BottomSheet } from '@/shared/BottomSheet';
import { useEffect, useState } from 'react';
import { PreviewItem, Previews } from '@/components/Previews';
import { mapToPreviews } from './utils';
import { fetchTags, revalidateCache, PhotoOrderUpdateDto, updatePhotosOrder } from '@/api';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { useRouter } from 'next/navigation';

export function PhotoMove({ photos, ...rest }: PhotoMoveProps) {
  const router = useRouter();
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviews(mapToPreviews(photos));
  }, [photos]);

  const onOk = async () => {
    const reordered: PhotoOrderUpdateDto[] = [];

    previews.forEach(({ id: previewId }, order) => {
      const photo = photos.find(ph => ph.id === Number(previewId) && ph.order !== order);
      if (photo) {
        const { id } = photo;
        reordered.push({ id, order });
      }
    });

    if (reordered.length) {
      setLoading(true);

      try {
        await updatePhotosOrder(reordered);
        await revalidateCache({ tags: [fetchTags.GET_PHOTOS] });
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
    setPreviews(mapToPreviews(photos));
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
