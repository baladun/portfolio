'use client';

import { Placeholder } from '@/components/Placeholder';
import { IconPark } from '@/shared/IconPark';
import { Typography } from '@/shared/Typography';
import { useState } from 'react';
import { PhotoAddDialog } from './PhotoAddDialog';
import { useRouter } from 'next/navigation';
import { PhotoAddProps } from './types';
import { revalidateCache } from '@/api-client';
import { InternalPath } from '@/types';

const { Text } = Typography;

export function PhotoAdd({ albumId }: PhotoAddProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onOk = async () => {
    await revalidateCache({ paths: [`/albums/${albumId}` as InternalPath] });
    router.refresh();
    setDialogOpen(false);
  };

  const onCancel = () => setDialogOpen(false);

  return (
    <>
      <Placeholder onClick={() => setDialogOpen(true)}>
        <IconPark
          type="Plus"
          className="mb-3 text-4xl"
        />

        <Text
          color="current"
          size="sm"
        >
          Add Photos
        </Text>
      </Placeholder>

      <PhotoAddDialog
        albumId={albumId}
        open={dialogOpen}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
}
