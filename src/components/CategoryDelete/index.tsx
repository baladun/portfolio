'use client';

import { CategoryDeleteProps } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { Dialog } from '@/shared/Dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { deleteCategory, fetchTags, revalidateCache } from '@/api';
import { useRouter } from 'next/navigation';

export function CategoryDelete({ category }: CategoryDeleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOk = async () => {
    setLoading(true);

    try {
      await deleteCategory(category.id);
      await revalidateCache({ paths: ['/categories'], tags: [fetchTags.GET_CATEGORIES] });
      router.refresh();
      toast.success(toastMsg.SUCCESS);
      setOpen(false);
    } catch (e) {
      toast.error(toastMsg.WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        icon={<IconPark type="Delete" />}
        onClick={e => {
          e.preventDefault();
          setOpen(true);
        }}
      />

      <Dialog
        headingText="Delete Category"
        open={open}
        loading={loading}
        okText="Confirm"
        onOk={onOk}
        onCancel={() => setOpen(false)}
      >
        Everything related to <span className="font-bold">{category.name}</span> (albums, photos) to be deleted. <br />
        Are you sure?
      </Dialog>
    </>
  );
}
