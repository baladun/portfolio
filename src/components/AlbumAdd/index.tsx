'use client';

import { Placeholder } from '@/components/Placeholder';
import { IconPark } from '@/shared/IconPark';
import { Typography } from '@/shared/Typography';
import { useState } from 'react';
import { AlbumAddDialog } from './AlbumAddDialog';
import { useRouter } from 'next/navigation';
import { AlbumAddProps } from './types';

const { Text } = Typography;

export function AlbumAdd({ categoryId }: AlbumAddProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onOk = () => {
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
          Add Album
        </Text>
      </Placeholder>

      <AlbumAddDialog
        categoryId={categoryId}
        open={dialogOpen}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
}

export { addAlbumFormValidationSchema } from './utils';
export type { AddAlbumFormValue } from './utils';
