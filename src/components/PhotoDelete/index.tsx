'use client';

import { PhotoDeleteProps } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { Dialog } from '@/shared/Dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { deletePhoto, revalidateCache } from '@/api-client';
import { useRouter } from 'next/navigation';
import { InternalPath } from '@/types';

export function PhotoDelete({ photo }: PhotoDeleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOk = async () => {
    setLoading(true);

    try {
      await deletePhoto(photo.id);
      await revalidateCache({ paths: [`/albums/${photo.albumId}` as InternalPath] });
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
        headingText="Delete Photo"
        open={open}
        loading={loading}
        okText="Confirm"
        onOk={onOk}
        onCancel={() => setOpen(false)}
      >
        Are you sure?
      </Dialog>
    </>
  );
}
