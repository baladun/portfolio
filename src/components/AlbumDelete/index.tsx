'use client';

import { AlbumDeleteProps } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { Dialog } from '@/shared/Dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { deleteAlbum, fetchTags, revalidateCache } from '@/api';
import { useRouter } from 'next/navigation';
import { Tooltip } from '@/shared/Tooltip';

export function AlbumDelete({ album }: AlbumDeleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOk = async () => {
    setLoading(true);

    try {
      await deleteAlbum(album.id);
      await revalidateCache({ paths: ['/', '/albums'], tags: [fetchTags.GET_ALBUMS] });
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
      <Tooltip content={album.showcaseOrder != null ? 'You can not delete album while it is on Showcase' : ''}>
        <Button
          size="sm"
          icon={<IconPark type="Delete" />}
          disabled={album.showcaseOrder != null}
          onClick={e => {
            e.preventDefault();
            setOpen(true);
          }}
        />
      </Tooltip>

      <Dialog
        headingText="Delete Album"
        open={open}
        loading={loading}
        okText="Confirm"
        onOk={onOk}
        onCancel={() => setOpen(false)}
      >
        Everything related to <span className="font-bold">{album.name}</span> (photos) to be deleted. <br />
        Are you sure?
      </Dialog>
    </>
  );
}
