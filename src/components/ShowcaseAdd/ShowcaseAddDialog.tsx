'use client';

import { ShowcaseAddDialogProps } from './types';
import { Dialog } from '@/shared/Dialog';
import { Typography } from '@/shared/Typography';
import { AlbumPreview } from './AlbumPreview';
import { useState } from 'react';
import { addToShowcase, AlbumDto, fetchTags, revalidateCache } from '@/api';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';

const { Text } = Typography;

export function ShowcaseAddDialog({ allAlbums, open, onOk, onCancel }: ShowcaseAddDialogProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDto>();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (selectedAlbum) {
      setLoading(true);

      try {
        await addToShowcase({ albumId: selectedAlbum.id });
        await revalidateCache({ paths: ['/'], tags: [fetchTags.GET_ALBUMS] });
        toast.success(toastMsg.SUCCESS);
        setSelectedAlbum(undefined);
        onOk();
      } catch (e: any) {
        toast.error(toastMsg.WENT_WRONG);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setSelectedAlbum(undefined);
    onCancel();
  };

  return (
    <Dialog
      open={open}
      headingText="Add to Showcase"
      loading={loading}
      showOk={!!selectedAlbum}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="grid max-w-4xl grid-cols-7 gap-2">
        {allAlbums.map(el => (
          <AlbumPreview
            key={el.id}
            image={el.coverImage}
            className={classnames(el.showcaseOrder != null ? 'touch-none opacity-20' : 'cursor-pointer')}
            selected={selectedAlbum && selectedAlbum.id === el.id}
            subtitle={
              <Text
                size="sm"
                className="block truncate text-center"
              >
                {el.name}
              </Text>
            }
            onClick={() => el.showcaseOrder == null && setSelectedAlbum(el)}
          />
        ))}
      </div>
    </Dialog>
  );
}
