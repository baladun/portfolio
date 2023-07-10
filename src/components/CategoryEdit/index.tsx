'use client';

import { CategoryEditProps, PreloadedCover } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@/shared/Dialog';
import { Control, Form, InputText } from '@/shared/Form';
import { Controller, useForm } from 'react-hook-form';
import { ImageUpload } from '@/components/ImageUpload';
import { addCategoryFormValidationSchema, AddCategoryFormValue } from '@/components/CategoryAdd';
import { yupResolver } from '@hookform/resolvers/yup';
import { submitEvent } from '@/utils';
import { deleteImage, fetchTags, getImage, ImageDto, revalidateCache, updateCategories, uploadImage } from '@/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { toastMsg } from '@/configs';

export function CategoryEdit({ category }: CategoryEditProps) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddCategoryFormValue>({
    mode: 'onBlur',
    resolver: yupResolver(addCategoryFormValidationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preloadedCover, setPreloadedCover] = useState<PreloadedCover>();

  useEffect(() => {
    if (category) {
      if (category.coverImage && category.coverImage.id !== preloadedCover?.id) {
        preloadCover();
      }

      if (!category.coverImage && preloadedCover) {
        setPreloadedCover(undefined);
      }

      reset({ name: category.name });
    }
  }, [category]);

  const preloadCover = async () => {
    const coverImage = category.coverImage as ImageDto;
    const blob = await getImage(coverImage.id);
    setPreloadedCover({ id: coverImage.id, file: new File([blob], category.name, { type: coverImage.mime }) });
  };

  const handleOk = () => {
    formRef?.current?.dispatchEvent(submitEvent);
  };
  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    const { name, coverImage } = getValues();
    const curCategory = category;
    setLoading(true);

    try {
      if (curCategory.coverImage) {
        await deleteImage(curCategory.coverImage.id);
      }

      const image = coverImage?.length ? await uploadImage(coverImage[0]) : null;
      await updateCategories([{ id: curCategory.id, name, coverImageId: image?.id }]);
      await revalidateCache({ tags: [fetchTags.GET_CATEGORIES] });
      router.refresh();
      toast.success(toastMsg.SUCCESS);
      reset();
      setOpen(false);
    } catch (e: any) {
      toast.error(toastMsg.WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        icon={<IconPark type="Pencil" />}
        onClick={e => {
          e.preventDefault();
          setOpen(true);
        }}
      />

      <Dialog
        headingText="Edit Category"
        open={open}
        loading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Control
            label="Name"
            error={errors.name}
          >
            <InputText
              control={control}
              name="name"
            />
          </Control>
          <Control
            label="Cover"
            reserveErrorSpace={false}
          >
            <Controller
              control={control}
              name="coverImage"
              render={({ field: { onChange, onBlur, ref } }) => (
                <ImageUpload
                  ref={ref}
                  shape="square"
                  preloaded={preloadedCover?.file}
                  onUpdate={v => {
                    onChange(v);
                    onBlur();
                  }}
                />
              )}
            />
          </Control>
        </Form>
      </Dialog>
    </>
  );
}
