'use client';

import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { CategoryMoveProps } from './types';
import { BottomSheet } from '@/shared/BottomSheet';
import { useEffect, useState } from 'react';
import { PreviewItem, Previews } from '@/components/Previews';
import { mapToPreviews } from './utils';
import { fetchTags, revalidateCache, updateCategories, UpdateCategoryDto } from '@/api';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { useRouter } from 'next/navigation';

export function CategoryMove({ categories, ...rest }: CategoryMoveProps) {
  const router = useRouter();
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviews(mapToPreviews(categories));
  }, [categories]);

  const onOk = async () => {
    const reordered: UpdateCategoryDto[] = [];

    previews.forEach(({ id }, order) => {
      const category = categories.find(cat => cat.id === Number(id) && cat.order !== order);
      if (category) {
        const { id, name, coverImage } = category;
        reordered.push({ id, name, coverImageId: coverImage ? coverImage.id : null, order });
      }
    });

    if (reordered.length) {
      setLoading(true);

      try {
        await updateCategories(reordered);
        await revalidateCache({ tags: [fetchTags.GET_CATEGORIES] });
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
    setPreviews(mapToPreviews(categories));
    setOpen(false);
  };

  return (
    <>
      {!!categories.length && (
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
