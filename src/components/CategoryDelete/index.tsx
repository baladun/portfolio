'use client';

import { CategoryDeleteProps } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { Dialog } from '@/shared/Dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';
import { deleteCategory, fetchTags, getAlbums, revalidateCache } from '@/api';
import { useRouter } from 'next/navigation';

export function CategoryDelete({ category }: CategoryDeleteProps) {
  const router = useRouter();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [notAllowedDialogOpen, setNotAllowedDialogOpen] = useState(false);
  const [checkingAbilityToDelete, setCheckingAbilityToDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIfAbleToDelete = async () => {
    setCheckingAbilityToDelete(true);

    try {
      const albums = await getAlbums({ categoryId: category.id });

      if (albums.some(el => el.showcaseOrder != null)) {
        setNotAllowedDialogOpen(true);
      } else {
        setConfirmationDialogOpen(true);
      }
    } catch (e) {
      toast.error(toastMsg.WENT_WRONG);
    } finally {
      setCheckingAbilityToDelete(false);
    }
  };

  const onOk = async () => {
    setLoading(true);

    try {
      await deleteCategory(category.id);
      await revalidateCache({ paths: ['/categories', '/albums'], tags: [fetchTags.GET_CATEGORIES, fetchTags.GET_ALBUMS] });
      router.refresh();
      toast.success(toastMsg.SUCCESS);
      setConfirmationDialogOpen(false);
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
        icon={
          checkingAbilityToDelete ? (
            <IconPark
              type="Loading"
              spin
            />
          ) : (
            <IconPark type="Delete" />
          )
        }
        disabled={checkingAbilityToDelete}
        onClick={e => {
          e.preventDefault();
          checkIfAbleToDelete();
        }}
      />

      <Dialog
        headingText="Delete Category"
        open={confirmationDialogOpen}
        loading={loading}
        okText="Confirm"
        onOk={onOk}
        onCancel={() => setConfirmationDialogOpen(false)}
      >
        Everything related to <span className="font-bold">{category.name}</span> (albums, photos) to be deleted. <br />
        Are you sure?
      </Dialog>

      <Dialog
        headingText="Delete Category"
        open={notAllowedDialogOpen}
        showOk={false}
        cancelText="Got it"
        onCancel={() => setNotAllowedDialogOpen(false)}
      >
        You can not delete category while at least one related album is on Showcase
      </Dialog>
    </>
  );
}
