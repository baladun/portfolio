'use client';

import { Placeholder } from '@/components/Placeholder';
import { IconPark } from '@/shared/IconPark';
import { Typography } from '@/shared/Typography';
import { useState } from 'react';
import { CategoryAddDialog } from './CategoryAddDialog';
import { useRouter } from 'next/navigation';

const { Text } = Typography;

export function CategoryAdd() {
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
          Add Category
        </Text>
      </Placeholder>

      <CategoryAddDialog
        open={dialogOpen}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
}

export { addCategoryFormValidationSchema } from './utils';
export type { AddCategoryFormValue } from './utils';
