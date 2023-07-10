import { CategoryAddDialogProps } from './types';
import { Control, Form, InputText } from '@/shared/Form';
import { Dialog } from '@/shared/Dialog';
import { Controller, useForm } from 'react-hook-form';
import { addCategoryFormValidationSchema, AddCategoryFormValue } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { submitEvent } from '@/utils';
import { ImageUpload } from '@/components/ImageUpload';
import { createCategory, Exception, fetchTags, revalidateCache, uploadImage } from '@/api';
import toast from 'react-hot-toast';

export function CategoryAddDialog({ open, onOk, onCancel }: CategoryAddDialogProps) {
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
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    formRef?.current?.dispatchEvent(submitEvent);
  };
  const handleCancel = () => {
    reset();
    onCancel();
  };

  const onSubmit = async () => {
    const { name, coverImage } = getValues();
    setLoading(true);

    try {
      const image = coverImage?.length ? await uploadImage(coverImage[0]) : null;
      const category = await createCategory({ name, coverImageId: image?.id });
      await revalidateCache({ tags: [fetchTags.GET_CATEGORIES] });
      toast.success(category.name);
      reset();
      onOk();
    } catch (e: any) {
      toast.error((e as Exception).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      headingText="Add Category"
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
