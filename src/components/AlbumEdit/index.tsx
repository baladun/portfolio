'use client';

import { AlbumEditProps, PreloadedCover } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@/shared/Dialog';
import { Control, Form, InputText, Select, SelectOption, TextArea } from '@/shared/Form';
import { Controller, useForm } from 'react-hook-form';
import { ImageUpload } from '@/components/ImageUpload';
import { yupResolver } from '@hookform/resolvers/yup';
import { submitEvent } from '@/utils';
import {
  deleteImage,
  fetchTags,
  getCategories,
  getImage,
  ImageDto,
  revalidateCache,
  updateAlbum,
  updateAlbumsOrder,
  uploadImage,
} from '@/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { toastMsg } from '@/configs';
import { editAlbumFormValidationSchema, EditAlbumFormValue } from './utils';

export function AlbumEdit({ album }: AlbumEditProps) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<EditAlbumFormValue>({
    mode: 'onBlur',
    resolver: yupResolver(editAlbumFormValidationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preloadedCover, setPreloadedCover] = useState<PreloadedCover>();
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (album) {
      if (album.coverImage && album.coverImage.id !== preloadedCover?.id) {
        preloadCover();
      }

      if (!album.coverImage && preloadedCover) {
        setPreloadedCover(undefined);
      }

      reset({ name: album.name, categoryId: album.categoryId, description: album.description || undefined });
    }
  }, [album]);

  useEffect(() => {
    getCategories().then(categories => {
      const options: SelectOption[] = categories.map(({ id, name }) => ({ label: name, value: id }));
      setCategoryOptions(options);
    });
  }, []);

  const preloadCover = async () => {
    const coverImage = album.coverImage as ImageDto;
    const blob = await getImage(coverImage.id);
    setPreloadedCover({ id: coverImage.id, file: new File([blob], album.name, { type: coverImage.mime }) });
  };

  const handleOk = () => {
    formRef?.current?.dispatchEvent(submitEvent);
  };
  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    const { name, categoryId, description, coverImage } = getValues();
    setLoading(true);

    try {
      if (album.coverImage) {
        await deleteImage(album.coverImage.id);
      }

      const image = coverImage?.length ? await uploadImage(coverImage[0]) : null;
      await updateAlbum(album.id, { name, categoryId: Number(categoryId), description, coverImageId: image?.id });
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
        headingText="Edit Album"
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
            label="Category"
            error={errors.categoryId}
          >
            <Select
              control={control}
              name="categoryId"
              options={categoryOptions}
            />
          </Control>
          <Control label="Description">
            <TextArea
              control={control}
              name="description"
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
