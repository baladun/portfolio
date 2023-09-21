import { AlbumAddDialogProps } from './types';
import { Control, Form, InputText, TextArea } from '@/shared/Form';
import { Dialog } from '@/shared/Dialog';
import { Controller, useForm } from 'react-hook-form';
import { addAlbumFormValidationSchema, AddAlbumFormValue } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { submitEvent } from '@/utils';
import { ImageUpload } from '@/components/ImageUpload';
import { createAlbum, revalidateCache, uploadImage } from '@/api';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';

export function AlbumAddDialog({ categoryId, open, onOk, onCancel }: AlbumAddDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddAlbumFormValue>({
    mode: 'onBlur',
    resolver: yupResolver(addAlbumFormValidationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    formRef?.current?.dispatchEvent(submitEvent);
  };
  const handleCancel = () => {
    reset();
    onCancel();
  };

  const onSubmit = async () => {
    const { name, coverImage, description } = getValues();
    setLoading(true);

    try {
      const image = coverImage?.length ? await uploadImage(coverImage[0]) : null;
      const album = await createAlbum({ categoryId, name, coverImageId: image?.id, description });
      await revalidateCache({ paths: ['/albums'] });
      toast.success(album.name);
      reset();
      onOk();
    } catch (e: any) {
      toast.error(toastMsg.WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      headingText="Add Album"
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
  );
}
