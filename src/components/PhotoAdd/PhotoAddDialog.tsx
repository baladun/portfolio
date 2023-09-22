import { PhtotoAddDialogProps } from './types';
import { Control, Form } from '@/shared/Form';
import { Dialog } from '@/shared/Dialog';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { addPhotosFormValidationSchema, AddPhotosFormValue } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { submitEvent } from '@/utils';
import { ImageUpload } from '@/components/ImageUpload';
import { createPhotos, ImageDto, uploadImage } from '@/api-client';
import toast from 'react-hot-toast';
import { toastMsg } from '@/configs';

export function PhotoAddDialog({ albumId, open, onOk, onCancel }: PhtotoAddDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddPhotosFormValue>({
    mode: 'onBlur',
    resolver: yupResolver(addPhotosFormValidationSchema),
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
    const { images } = getValues();
    setLoading(true);

    try {
      const res = await Promise.allSettled(images.map(blob => uploadImage(blob)));
      if (res.find(el => el.status === 'rejected')) {
        toast.error('Some images were not uploaded');
      }

      const uploaded: ImageDto[] = [];
      res.forEach(el => {
        if (el.status === 'fulfilled') {
          uploaded.push(el.value);
        }
      });

      if (uploaded.length) {
        await createPhotos({ albumId, imageIds: uploaded.map(el => el.id) });
        toast.success(toastMsg.SUCCESS);
        reset();
        onOk();
      }
    } catch (e: any) {
      toast.error(toastMsg.WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      headingText="Add Photos"
      loading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Control
          label="Photos"
          error={errors.images as FieldError}
        >
          <Controller
            control={control}
            name="images"
            render={({ field: { onChange, onBlur, ref } }) => (
              <ImageUpload
                ref={ref}
                multiple
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
